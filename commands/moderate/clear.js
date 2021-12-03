const {CommandInteraction} = require("discord.js");
const { ApplicationCommandOptionType } = require("discord-api-types/v8");

module.exports = {
    name: "clear",
    description:"Clears a specific amount of messages",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "until",
            description: "until which message should be cleared",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "message_id",
                    description: "the message id up to which one should be deleted",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "channel_id",
                    description: "Channel id in which messages should get deleted"
                },
                {
                    type: ApplicationCommandOptionType.User,
                    name: "user",
                    description: "User of which messages should get deleted"
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "amount",
            description: "how many messages should be deleted",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "amount",
                    description: "the amount of how many messages should be deleted",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.Channel,
                    name: "channel",
                    description: "Channel id in which messages should get deleted"
                },
                {
                    type: ApplicationCommandOptionType.User,
                    name: "user",
                    description: "User of which messages should get deleted"
                }
            ]
        }
    ],
    /**
     *
     * @param {CommandInteraction}interaction
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        let channel = interaction.channel
        const messages = channel.messages.fetch();
        const amount = interaction.options.getInteger("amount")
        const messageId = interaction.options.getString("message_id")
        const user = interaction.options.getUser("user")
        const channelToDelete = interaction.options.getChannel("channel")

        if (channelToDelete) {
            channel = channelToDelete
        }

        if (amount) {
            const deleted = await deleteMessages(amount, channel, user)
            interaction.reply("cleared "+ deleted + " messages in channel <#" + channel.id + ">")
        } else if (messageId) {
            const messagesInJSON = (await messages).toJSON();
            const message = (await messages).get(messageId)
            const indexOfMessage = messagesInJSON.indexOf(message)
            const messagesAfter = messagesInJSON.slice(0, indexOfMessage)
            let amount = messagesAfter.length
            const deleted = await deleteMessages(amount, channel, user)
            interaction.reply("cleared "+ deleted + " messages in channel <#" + channel.id + ">")
        }
    }
}

async function deleteMessages(amount, channel, user, old = false) {
    let deleted = 0;

    while(amount > 0) {
        let deletedAmount = 0
        if (old === true || amount < 2 || user) {
            const messages = await channel.messages.fetch()

            for (const message of messages) {
                if (amount === 0) {
                    continue
                }
                console.log(message)
                console.log(message[1].author)
                if (user) {
                    if (message[1].author.id === user.id) {
                        message[1].delete().then()
                        deletedAmount++
                        amount--
                    }
                } else {
                    message.delete().then()
                    deletedAmount++
                    amount--
                }
            }

            /*for (let message of messages) {
                if (amount === 0){
                    continue
                }
                if (user) {
                    if (message[1].author.id === user.id) {
                        message[1].delete().then()
                    }
                    deletedAmount++
                    amount--
                } else {
                    message[1].delete().then()
                    deletedAmount++
                    amount--
                }
            }*/
        } else {
            if (amount > 100) {
                deletedAmount += await perform(100, channel)
            } else {
                deletedAmount += await perform(amount, channel)
            }
            amount-=deletedAmount;
        }
        deleted += deletedAmount
    }
    return deleted
}

async function perform(amount, channel) {
    let deletedAmount = 0
    const deletedMessages = await channel.bulkDelete(amount, true)
    deletedAmount += deletedMessages.size
    if (deletedMessages.size !== amount) {
        deletedAmount += await deleteMessages(amount-deletedMessages.size, channel, true)
    }
    deletedAmount += deletedMessages.size

    return deletedAmount
}