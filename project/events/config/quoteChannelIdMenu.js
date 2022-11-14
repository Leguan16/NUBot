const {SelectMenuInteraction, EmbedBuilder, GuildChannel} = require("discord.js")
const botConfig = require("../../util/botConfig")

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {SelectMenuInteraction} interaction
     * @requires {GuildChannel}
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        if (!interaction.isSelectMenu()) {
            return
        }

        const errorEmbed = new EmbedBuilder()
            .setColor("RED")
            .setDescription("Error")

        const {customId} = interaction

        if (customId !== "quote.channelId.menu") {
            return
        }

        botConfig.getConfig().quote.channelId = interaction.values[0] ? interaction.values[0] : "none"
        botConfig.save()

        const newChannelId = botConfig.getConfig().quote.channelId

        const embed = new EmbedBuilder()
            .setColor("GREEN")
            .setDescription(`updated value of \`quote.channelId\` to \`${newChannelId}\` (${await interaction.guild.channels.fetch(newChannelId)})`)

        interaction
            .update({embeds: [embed]})
            .catch(() => interaction.reply({embeds: [errorEmbed], ephemeral: true}))
    }
}