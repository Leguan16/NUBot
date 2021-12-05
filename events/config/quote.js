/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */

const {ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js")
const {quote} = require("../../config.json")
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isButton()) {
            return
        }

        const { customId, message } = interaction
        await message.fetch()

        const errorEmbed = new MessageEmbed()
            .setDescription("Error")

        if (customId === "quote" ) {
            const embed = message.embeds[0]

            if (!embed) {
                await interaction.reply({embeds: [errorEmbed], ephemeral: true})
                return
            }

            embed
                .setDescription("Edit the quote config")

            const channelId = quote.channelId
            embed.addField("channelId", `${channelId ? channelId : "none"}`)

            const components = message.components

            if (!components) {
                await interaction.reply({embeds: [errorEmbed], ephemeral: true})
                return
            }

            const row = new MessageActionRow()

            row.addComponents(new MessageButton().setCustomId("config.channelId").setLabel("channelId").setStyle("PRIMARY"))
            await message.edit({embeds: [embed], components: [row]})

            interaction.reply({content: "entered quote config", ephemeral: true})
        }
    }
}