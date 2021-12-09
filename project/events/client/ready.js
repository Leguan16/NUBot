const {Client} = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "ready",
    once: true,
    /**
     *
     * @param {Client} client
     */
    execute(client) {

        const name = client.user.username.startsWith("NUBot") ? "NU".white + "Bot".blue : client.user.username

        console.log(`Logged in as ${name}...`.green)
        client.user.setActivity("/", {type: "WATCHING"})

        if (!fs.existsSync(`${process.cwd()}/polls/`)) {
            fs.mkdirSync(`${process.cwd()}/polls/`, {recursive: true})


        }
    }
}