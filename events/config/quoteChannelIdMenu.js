const { SelectMenuInteraction, MessageEmbed, GuildChannel} = require("discord.js")
const { config } = require("../../main")
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

        const { customId } = interaction

        if (customId !== "config.channelId.menu") {
            return
        }

        console.log(interaction)

        config.quote.channelId = interaction.values[0] ? interaction.values[0] : "none"

        fs.writeFileSync(process.cwd()+"/config.json", JSON.stringify(config), "utf8")

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`updated value of \`quote.channelId\` to \`${config.quote.channelId}\``)

        interaction.update({embeds: [embed], components: []})
    }
}