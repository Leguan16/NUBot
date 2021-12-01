/*
 * Copyright (c) 2021. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

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