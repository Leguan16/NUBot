const {Client, EmbedBuilder, TextChannel} = require("discord.js")

module.exports = {
    name: "messageDelete",
    once: false,
    async execute(message, client) {
        const messageLog = client.channels.cache.get("533046971334918168")

        let embed;
        if (!message.partial) {

            console.log(message.channelId);

            embed = new EmbedBuilder()
                .setTitle("Message Deleted")
                .setAuthor(`${message.author.username}`)
                .setTimestamp(Date.now())
                .setColor("RED")
                .addFields({name: "Channel", value: `<#${message.channelId}>`})
        }


        messageLog.send({embeds: [embed]})
    }
}