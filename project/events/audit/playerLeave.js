const {client} = require("../../main");
const botConfig = require("../../util/botConfig")
const { MessageEmbed, TextChannel } = require("discord.js")

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(user, client) {
        const guild = user.guild
        let logChannel = await guild.channels.fetch(botConfig.getConfig().audit.playerJoin)


        if (!logChannel) {
            return
        }

        console.log(user)

        if (user.partial){
            user = await user.user.fetch()
        }

        const embed = new MessageEmbed()
            .setColor("aa0000")
            .setTitle("User Left")
            .setDescription(`**${user.user.username} left the server**`)
            .setTimestamp(Date.now())
            .setFooter(`User Id: ${user.id}`, user.guild.iconURL({size: 4096}))
            .setThumbnail(user.user.avatarURL({size: 4096}))

        logChannel.send({embeds: [embed]})

    }
}