/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 * https://github.com/Leguan16/NUBot/blob/master/LICENSE.md
 */

const {CommandInteraction} = require("discord.js")

module.exports = {
    name: "test",
    description: "test command for development",
    /**
     *
     * @param { CommandInteraction } interaction
     */
    execute(interaction) {
        interaction.reply("test").then()
    }
}