const {Client, CommandInteraction,  EmbedBuilder} = require("discord.js")

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            const command = client.commands.get(interaction.commandName);

            const errorEmbed = new EmbedBuilder()
                .setColor("Red")
                .setDescription("An error occurred while running the command")

            if (!command) return interaction.reply({embeds: errorEmbed}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client).catch(reason => {
                console.error(reason)

                interaction.reply({embeds: [errorEmbed]})
            })
        }
    }
}