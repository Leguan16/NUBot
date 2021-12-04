const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const client = require("../../main")
module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return interaction.reply({embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("An error occurred while running the command")
                ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client).catch(reason => {
                console.error(reason)
                interaction.reply("An error occurred!")
            })
        }
    }
}