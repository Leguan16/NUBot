/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */

const { Client, Collection } = require("discord.js");
const botConfig = require("./util/botConfig")

botConfig.init();

const client = new Client( { intents: 32767, partials: ['MESSAGE', 'CHANNEL'] } )

require("./handlers/events")(client)
require("./handlers/commands")(client)

client.commands = new Collection()
client.polls = false

client.login(botConfig.getConfig().token).then()

module.exports = {
    client
}