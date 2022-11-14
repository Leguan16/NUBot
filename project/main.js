const {Client, Collection, ClientOptions, Partials} = require("discord.js");
const botConfig = require("./util/botConfig")

botConfig.init();

const client = new Client({intents: 32767, partials: [Partials.Message, Partials.Channel]})

require("./handlers/events")(client)
require("./handlers/commands")(client)

client.commands = new Collection()
client.polls = false

client.login(botConfig.getConfig().token).then()


// botConfig.getValue("config.quote.channelId")

module.exports = {
    client
}