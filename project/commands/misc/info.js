/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 * https://github.com/Leguan16/NUBot/blob/master/LICENSE.md
 */

const {CommandInteraction} = require("discord.js")
const {ApplicationCommandOptionType} = require("discord-api-types/v8")
const {userInfo} = require("./userinfo")
const {serverInfo} = require("./serverinfo")

module.exports = {
    name: "info",
    description: "get info about either a server or a user",
    options: [
        {
            name: "server",
            description: "get info about the server",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "user",
            description: "get info about a specific user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "the user you want to get the info",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        }
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand()

        if (subcommand === "server") {
            await serverInfo(interaction).catch(error => {
                console.log(error)
                interaction.reply("an error occurred")
            })
        } else if (subcommand === "user") {
            await userInfo(interaction).catch(error => {
                console.log(error)
                interaction.reply("an error occurred")
            })
        }
    }
}

