/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */

const {ApplicationCommandOptionType} = require("discord-api-types/v8");
const {CommandInteraction, MessageEmbed} = require("discord.js")
const {deleteMessages} = require("./clear")

module.exports = {
    name: "clearuntil",
    description: "Clears a specific amount of messages",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "message_id",
            description: "the message id up to which one should be deleted",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "channel",
            description: "Channel id in which messages should get deleted"
        },
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            description: "User of which messages should get deleted"
        }
    ],
    async execute(interaction) {
        await deleteUntil(interaction)
    }
}

/**
 *
 * @param {CommandInteraction} interaction
 * @returns {Promise<void>}
 */
async function deleteUntil(interaction) {
    const messageId = interaction.options.getString("message_id")
    const channel = interaction.options.getChannel("channel") ? interaction.options.getChannel("channel") : interaction.channel
    const messages = await channel.messages.fetch({after: messageId})
    const user = interaction.options.getUser("user")
    let amount = messages.size
    const deleted = await deleteMessages(amount, channel, user)

    const embed = new MessageEmbed()
        .setColor("#ff6c00")
        .setDescription(`Cleared ${deleted} messages in channel ${channel}`)

    await interaction.reply({embeds: [embed]})
    await sleep(4000)
    await interaction.deleteReply()
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}