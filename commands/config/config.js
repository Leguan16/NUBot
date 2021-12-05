/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */

const {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const {MessageButtonStyles} = require("discord-api-types/v9");

module.exports = {
    name: "config",
    description: "change the bots config",
    permission: "ADMINISTRATOR",
    /**
     *
     * @requires {MessageButton, MessageActionRow}
     * @param {CommandInteraction} interaction
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const row = new MessageActionRow()

        row.addComponents(
            new MessageButton().setCustomId("quote").setLabel("Quote").setStyle("PRIMARY")
        )

        const embed = new MessageEmbed()
            .setDescription("Edit the config!")
        await interaction.reply({embeds: [embed], components: [row] })
    }
}