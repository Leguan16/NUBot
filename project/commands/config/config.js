const {CommandInteraction, MessageActionRow, MessageButton, EmbedBuilder, ButtonInteraction} = require("discord.js");
const botConfig = require("../../util/botConfig");

module.exports = {
    activated: true,
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

    for (let configKey in botConfig.config) {
        row.addComponents(
            new MessageButton().setCustomId(configKey).setLabel(configKey).setStyle("PRIMARY")
        )
    }


    const embed = new EmbedBuilder()
        .setColor("#ab006c")
        .setTitle("Config")
        .setDescription("Edit the config!")

    if (interaction.isCommand()) {
        await interaction.reply({embeds: [embed], components: [row]})
    } else if (interaction.isButton()) {
        await interaction.update({embeds: [embed], components: [row]})
    }
}