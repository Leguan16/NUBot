const {CommandInteraction, Guild, TextChannel} = require("discord.js")
const fetchAll = require('discord-fetch-all');
const fs = require("fs");
const {Message} = require("../../domain/Message")

module.exports = {
    activated: true,
    name: "save",
    description: "save",
    /**
     *
     * @param { CommandInteraction } interaction
     */
    async execute(interaction) {
        const channels = await interaction.guild.channels.cache;

        const channelArray = Array.from(channels.values());

        for (let channel of channelArray) {
            if (channel.type !== 'GUILD_TEXT') {
                continue
            }

            saveMessages(channel)
        }

        interaction.reply("test").then()
    }

}

/**
 *
 * @param {TextChannel} channel
 */
async function saveMessages(channel) {
    const allMessagesOfChannel = await fetchAll.messages(channel, {reverseArray: true})

    let messages = [];
    for (let message of allMessagesOfChannel) {
        //content += `${message.author.username}#${message.author.discriminator}: ${message.content}\n`
        messages.push(Message(`${message.author.username}#${message.author.discriminator}`, message.content, message.attachments.values()))
    }

    fs.writeFile(`./savedChannels/${channel.name}.txt`, messages,
        err => {
            if (err) {
                console.error(err)
            } else {
                console.log(`Saved channel: ${channel.name}`)
            }
        })
}