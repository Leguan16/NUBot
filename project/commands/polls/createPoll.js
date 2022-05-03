const {CommandInteraction} = require("discord.js");
const {ApplicationCommandOptionType} = require("discord-api-types/v8");
const fs = require("fs");

module.exports = {
    activated: true,
    name: "poll",
    description: "create a poll",
    options: [
        {
            name: "create",
            description: "create a poll",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "poll_name",
                    description: "name of the poll to create",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    /**
     *
     * @param {CommandInteraction}interaction
     * @requires {fs}
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const name = interaction.options.getString("poll_name")
        if (!fs.existsSync(`${process.cwd()}/polls/`)) {
            interaction.reply("error creating poll; Directory does not exist!")
            return
        }

        fs.mkdirSync(`${process.cwd()}/polls/` + name)


        interaction.reply("poll created with name " + name)
    }
}