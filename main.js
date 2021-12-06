const { Client, Collection } = require("discord.js");
const FILE_SYSTEM = require('fs')
const COLORS = require("colors");
const botConfig = require("./util/botConfig")

const name = "NU".white+"Bot".blue

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