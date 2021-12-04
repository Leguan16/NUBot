/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */
const { CommandInteraction, GuildMember, Application} = require("discord.js")
const {ApplicationCommandOptionType, ChannelType, InviteTargetType} = require("discord-api-types/v8");

module.exports = {
    name: "voicegames",
    description: "start a voicegame",
    options: [
        {
            name: "game",
            description: "Name of the game",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Poker",
                    value: "755827207812677713"
                },
                {
                    name: "Watch Together",
                    value: "755600276941176913"
                },
                {
                    name: "Chess",
                    value: "832012586023256104"
                },
                {
                    name: "Betrayal.io",
                    value: "773336526917861400"
                },
                {
                    name: "Fishington.io",
                    value: "814288819477020702"
                },
                {
                    name: "Awkword",
                    value: "879863881349087252"
                },
                {
                    name: "Spellcast",
                    value: "852509694341283871"
                },
                {
                    name: "Doodlecrew",
                    value: "878067389634314250"
                },
                {
                    name: "Wordsnack",
                    value: "879863976006127627"
                },
                {
                    name: "Lettertile",
                    value: "879863686565621790"
                }
            ],
            required: true
        }
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @requires {GuildMember}
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const member = interaction.member

        if (!member) {
            interaction.reply("This command can only be executed in an guild")
            return
        }

        const channel = member.voice.channel;

        if (!channel) {
            interaction.reply("you need to be connected to a voice channel to use this feature")
        }

        const channelType = channel.type

        if (channelType !== "GUILD_VOICE") {
            interaction.reply("you need to be connected to a voice channel to use this feature")
            return
        }

        const invite = await channel.createInvite({targetApplication: interaction.options.getString("game"), targetType: 2, maxAge: 1000})

        interaction.reply("Created game at: https://discord.gg/" + invite)
    }

}