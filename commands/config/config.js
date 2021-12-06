/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */

const {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction} = require("discord.js");
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
            .setColor("#ab006c")
            .setTitle("Config")
            .setDescription("Edit the config!")

        if (interaction.isCommand()) {
            await interaction.reply({embeds: [embed], components: [row]})
        } else if (interaction.isButton()) {
            await interaction.update({embeds: [embed], components: [row]})
        }
    }
}