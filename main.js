const { Client, Collection } = require("discord.js");
const SlashCommandBuilder = require('@discordjs/builders');
const FILE_SYSTEM = require('fs')
const COLORS = require("colors");

const name = "NU".white+"Bot".blue

const config = JSON.parse(FILE_SYSTEM.readFileSync('config.json', 'utf8'))

const client = new Client( { intents: 32767, partials: ['MESSAGE', 'CHANNEL'] } );

require("./handlers/events")(client)
require("./handlers/commands")(client, config)

client.commands = new Collection();

client.login(config.token).then()

module.exports = {
    client,
    config
}