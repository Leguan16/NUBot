/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 * https://github.com/Leguan16/NUBot/blob/master/LICENSE.md
 */

const {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction} = require("discord.js");

module.exports = {
    name: "config",
    description: "change the bots config",
    permission: "ADMINISTRATOR",
    /**
     *
     * @requires {MessageButton, MessageActionRow}
     * @param {CommandInteraction, ButtonInteraction} interaction
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        await reply(interaction)
    },
    reply
}


async function reply(interaction) {
    const row = new MessageActionRow()

    row.addComponents(
        new MessageButton().setCustomId("quote").setLabel("Quote").setStyle("PRIMARY")
    )

    const embed = new MessageEmbed()
        .setColor("#ab006c")
        .setTitle("Config")
        .setDescription("Edit the config!")

    if (interaction.isCommand()) {
        await interaction.reply({embeds: [embed], components: [row]})
    } else if (interaction.isButton()) {
        await interaction.update({embeds: [embed], components: [row]})
    }
}