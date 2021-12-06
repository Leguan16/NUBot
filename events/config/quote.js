/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */

const {ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js")
const botConfig = require("../../util/botConfig")

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isButton()) {
            return
        }

        if (interaction.label === "back") {
            const config = require("../../commands/config/config")

            await config.execute(interaction);
            return
        }

        const {customId, message, guild} = interaction
        await message.fetch()

        const errorEmbed = new MessageEmbed()
            .setDescription("Error")

        if (customId === "quote") {
            const embed = new MessageEmbed()

            if (!embed) {
                await interaction.reply({embeds: [errorEmbed], ephemeral: true})
                return
            }

            embed
                .setDescription("Edit the quote config")

            const channelId = botConfig.getConfig().quote.channelId
            embed.addField("channelId", `${channelId ? `${channelId}\n${await guild.channels.fetch(channelId)}` : "none"}`)

            const components = message.components

            if (!components) {
                await interaction.reply({embeds: [errorEmbed], ephemeral: true})
                return
            }

            const row = new MessageActionRow()

            row.addComponents(new MessageButton().setCustomId("quote.channelId").setLabel("channelId").setStyle("PRIMARY"))
            row.addComponents(new MessageButton().setCustomId("quote").setLabel("back").setStyle("DANGER"))
            await interaction.update({embeds: [embed], components: [row]})
        }
    }
}