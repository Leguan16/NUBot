const {CommandInteraction, GuildMember} = require("discord.js")
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
                    value: "880218394199220334"
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
                    name: "Sketchy Artist",
                    value: "879864070101172255"
                },
                {
                    name: "Awkword",
                    value: "879863881349087252"
                },
                // {
                //     name: "Delete Me Calla",
                //     value: "832012854282158180"
                // },
                {
                    name: "Sketch Heads",
                    value: "902271654783242291"
                },
                {
                    name: "Checkers In The Park",
                    value: "832013003968348200"
                },
                {
                    name: "Blazing 8s",
                    value: "832025144389533716"
                },
                {
                    name: "Putt Party",
                    value: "945737671223947305"
                }
            ],
            required: true
        }
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @requires {GuildMember, ChannelType, InviteTargetType}
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

        const invite = await channel.createInvite({
            targetApplication: interaction.options.getString("game"),
            targetType: 2,
            maxAge: 1000
        })

        interaction.reply("Created game at: https://discord.gg/" + invite)
    }

}