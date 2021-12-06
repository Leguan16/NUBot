const {SelectMenuInteraction, MessageEmbed, GuildChannel} = require("discord.js")
const botConfig = require("../../util/botConfig")
const fs = require("fs")

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

        const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Error")

        const {customId} = interaction

        if (customId !== "quote.channelId.menu") {
            return
        }

        botConfig.getConfig().quote.channelId = interaction.values[0] ? interaction.values[0] : "none"
        botConfig.save()

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`updated value of \`quote.channelId\` to \`${botConfig.getConfig().quote.channelId}\``)

        interaction.update({embeds: [embed], components: []})
    }
}