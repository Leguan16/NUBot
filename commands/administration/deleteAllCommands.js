const { config, client } = require("../../main")
const {CommandInteraction} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    name: "deleteallcommands",
    description: "deletes all commands",

    async execute(interaction) {
        console.log(interaction.member.user.id)

        if (interaction.member.user.id === config.owner) {

            const commands = client.application.commands.fetch({force: true});

            await commands

            console.log(commands)

            /*client.application.commands.fetch({force: true}).then(r => {
                r.forEach((command, name) => {
                    client.guilds.cache.forEach((guild) => {
                        guild.commands.delete(command).then()
                    })
                    client.application.commands.delete(command).then()
                })
            })*/
            interaction.reply({content: "Deleted all commands!"})
        }
    }
}
