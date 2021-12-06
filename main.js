const { Client, Collection } = require("discord.js");
const FILE_SYSTEM = require('fs')
const COLORS = require("colors");

const name = "NU".white+"Bot".blue

let config = JSON.parse(FILE_SYSTEM.readFileSync('config.json', 'utf8'))

if (!config) {
    console.log("config.json is missing. Please create a file named 'config.json' or copy and rename the 'config.json' to 'config.json".red)
    config = JSON.parse(FILE_SYSTEM.readFileSync('config.json', 'utf8'))
}


if (!config.token) {
    console.log(`bot token is missing in the config`)
    return
}

const client = new Client( { intents: 32767, partials: ['MESSAGE', 'CHANNEL'] } )

require("./handlers/events")(client)
require("./handlers/commands")(client, config)

client.commands = new Collection()
client.polls = false

client.login(config.token).then()

module.exports = {
    client,
    config
}