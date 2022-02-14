const {client} = require("../../main");
const botConfig = require("../../util/botConfig")
const { MessageEmbed, TextChannel } = require("discord.js")

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(user, client) {
        const guild = user.guild
        let logChannel = await guild.channels.fetch(botConfig.getConfig().audit.playerJoin)

        console.log(user)

        if (!logChannel) {
            return
        }

        const embed = new MessageEmbed()
            .setColor("aa0000")
            .setTitle("User Left")
            .addField("Name", `${user.user.name}`)

        logChannel.send({embeds: [embed]})

    }
}