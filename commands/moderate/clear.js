const {CommandInteraction, MessageEmbed} = require("discord.js");
const { ApplicationCommandOptionType } = require("discord-api-types/v8");

module.exports = {
    name: "clear",
    description:"Clears a specific amount of messages",
    options: [
        {
            type: ApplicationCommandOptionType.Integer,
            name: "amount",
            description: "how many messages should be deleted",
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
    ],
    /**
     *
     * @param {CommandInteraction}interaction
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel") ? interaction.options.getChannel("channel") : interaction.channel
        const user = interaction.options.getUser("user")
        const amount = interaction.options.getInteger("amount")

        if (amount) {
            const deleted = await deleteMessages(amount, channel, user)

            const embed = new MessageEmbed()
                .setColor("#ff6c00")
                .setDescription(`cleared ${deleted} messages in channel ${channel}`)
            interaction.reply({embeds: [embed]})
            await sleep(4000)
            await interaction.deleteReply()
        }
    },
    deleteMessages
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

                if (user) {
                    if (message[1].author.id === user.id) {
                        message[1].delete().then()
                        deletedAmount++
                        amount--
                    }
                } else {
                    message[1].delete().then()
                    deletedAmount++
                    amount--
                }
            }
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
        deletedAmount += await deleteMessages(amount-deletedMessages.size, channel, false, true)
    }
    deletedAmount += deletedMessages.size

    return deletedAmount
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}