const client = require("../../main")
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.username}...`.green)
        client.user.setActivity("Porn", {type: "WATCHING"})
    }
}

