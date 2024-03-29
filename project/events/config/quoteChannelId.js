const {ButtonInteraction, GuildChannel, MessageSelectMenu, MessageActionRow, EmbedBuilder, MessageButton} = require("discord.js")
const {ChannelType} = require("discord-api-types/v10");

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

        const errorEmbed = new EmbedBuilder()
            .setColor("RED")
            .setDescription("Error")


        const {customId, guild} = interaction

        if (customId === "quote.channelId") {
            const channels = guild.channels.fetch()

            const selectMenu = new MessageSelectMenu().setCustomId("quote.channelId.menu").setPlaceholder("select channel");

            (await channels).forEach(channel => {
                if (channel.type === ChannelType.GuildText) {
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
                .addComponents(new MessageButton().setCustomId("quote.channelId.back").setLabel("back").setStyle("DANGER"))

            const embed = new EmbedBuilder()
                .setColor("#ab006c")
                .setDescription("Edit the quote.channelId config")

            await interaction
                .update({embeds: [embed], components: [row,buttonRow]})
                .catch(() => interaction.reply({embeds: [errorEmbed], ephemeral: true}))
        }

    }
}