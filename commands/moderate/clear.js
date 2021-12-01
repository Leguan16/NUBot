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
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "how_many",
            description: "how many messages should be deleted",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "amount",
                    description: "the amount of how many messages should be deleted",
                    required: true
                }
            ]
        }
    ],
    async execute(interaction) {
        const channel = interaction.channel
        const messages = channel.messages.fetch();
        let amount = interaction.options.getInteger("amount")
        const messageId = interaction.options.getString("message_id")

        if (amount) {
            await deleteMessages(amount, channel)
            interaction.reply("cleared", amount, "messages in channel", channel.toString())
        } else if (messageId) {
            const messagesInJSON = (await messages).toJSON();
            const message = (await messages).get(messageId)
            const indexOfMessage = messagesInJSON.indexOf(message)
            const messagesAfter = messagesInJSON.slice(0, indexOfMessage)
            let amount = messagesAfter.length
            await deleteMessages(amount, channel)
            interaction.reply("cleared messages in channel", channel)
        }
    }
}



async function deleteMessages(amount, channel, old = false) {
    if (old === true) {
        const messages = await channel.messages.fetch()
        for (let i = 0; i < amount; i++) {
            await messages.last().delete()
        }
    }else {
        let deleted
        if (amount > 100) {
            deleted = await channel.bulkDelete(100, true)
            amount -= 100;
            await deleteMessages(amount, channel)
        } else {
            deleted = await channel.bulkDelete(amount, true)
        }

        if (deleted.size < amount) {
            await deleteMessages(amount - deleted.size, channel, true)
        }
    }

}