const {CommandInteraction} = require("discord.js")

module.exports = {
    activated: true,
    name: "test",
    description: "test command for development",
    /**
     *
     * @param { CommandInteraction } interaction
     */
    execute(interaction) {

        console.log(interaction.user)

        interaction.reply("test").then()
    }
}