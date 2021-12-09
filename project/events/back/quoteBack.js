/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 * https://github.com/Leguan16/NUBot/blob/master/LICENSE.md
 */

const config = require("../../commands/config/config");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const customId = interaction.customId

        switch (customId) {
            case "quote.back":
                await config.reply(interaction);
                break
        }
    }
}