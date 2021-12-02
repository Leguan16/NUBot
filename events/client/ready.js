const client = require("../../main")
const fs = require("fs")

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.username}...`.green)
        client.user.setActivity("Porn", {type: "WATCHING"})

        if (!fs.existsSync(`${process.cwd()}/polls/`)) {
            fs.mkdirSync(`${process.cwd()}/polls/`, {recursive: true})


        }
    }
}