/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */

const {ButtonInteraction, GuildChannel, MessageSelectMenu, MessageActionRow, MessageEmbed, MessageButton} = require("discord.js")

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ButtonInteraction} interaction
     * @requires GuildChannel
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        if (!interaction.isButton()) {
            return
        }

        const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Error")


        const {customId, guild} = interaction

        if (customId === "quote.channelId") {
            const channels = guild.channels.fetch()

            const selectMenu = new MessageSelectMenu().setCustomId("quote.channelId.menu").setPlaceholder("select channel");

            (await channels).forEach(channel => {
                if (channel.type === "GUILD_TEXT") {
                    const data = {
                        name: channel.name,
                        id: channel.id
                    }

                    selectMenu.addOptions([
                        {
                            label: data.name,
                            description: data.name,
                            value: data.id
                        }
                    ])
                }
            })

            const row = new MessageActionRow().addComponents(selectMenu)

            const buttonRow = new MessageActionRow()
                .addComponents(new MessageButton().setCustomId("quote.channelId").setLabel("back").setStyle("DANGER"))

            const embed = new MessageEmbed()
                .setDescription("Edit the quote.channelId config")

            await interaction.update({embeds: [embed], components: [row,buttonRow]})
        }

    }
}