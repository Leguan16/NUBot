const {CommandInteraction, Partials} = require("discord.js")

module.exports = {
    activated: true,
    name: "quote",
    type: Partials.Message,
    /**
     *
     * @param {CommandInteraction} interaction
     * @returns {Promise<void>}
     */
    async execute(interaction) {

    }
}