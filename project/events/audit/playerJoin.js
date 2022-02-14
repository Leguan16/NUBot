const {client} = require("../../main");
const botConfig = require("../../util/botConfig")
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(user, client) {
        const guild = user.guild
        const logChannel = await guild.channels.fetch(botConfig.getConfig().audit.playerJoin)

        console.log(user)

        if (logChannel === null) {
            return
        }

        const embed = new MessageEmbed()
            .setColor("00aa00")
            .setTitle("User Joined")
            .addField("Name", `wwww`)

        logChannel.send({embeds: [embed]})
    }
}
