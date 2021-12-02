const client = require("../../main")
const discord = require("discord.js")

module.exports = {
    name: "messageDelete",
    once: false,
    async execute(event, message, client){
        console.log(event.member);
        const channel = message.channel

        if (message.partial) {

        }


        console.log(channel)
        const messages = channel.messages.fetch()

        const deletedMessage = (await messages).get(message.id)


        console.log(message)
        console.log(deletedMessage)
    }
}