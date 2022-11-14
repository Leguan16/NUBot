const {client} = require("../../main");
const botConfig = require("../../util/botConfig")
const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(user, client) {
        const guild = user.guild
        const logChannel = await guild.channels.fetch(botConfig.getConfig().audit.playerJoin)

        if (logChannel === null) {
            return
        }



        const embed = new EmbedBuilder()
            .setColor("00aa00")
            .setTitle("User Joined")
            .setDescription(`${user.user.name} joined the server`)
            .setTimestamp(Date.now())
            .setFooter(`User Id: ${user.id}`, user.guild.avatarURL({size: 4096}))
            .setThumbnail(user.iconURL({size: 4096}))

        logChannel.send({embeds: [embed]})
    }
}
