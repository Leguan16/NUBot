const { Perms } = require("../validation/permissions");
const { Client } = require("discord.js")
const { promisify } = require("util");
const { glob } = require("glob");
const config = require("../main")


const PG = promisify(glob);
/**
 * @param {Client} client
 * @param {config} config
 */
module.exports = async (client, config) => {

    const commandsArray = [];
    let successful = 0;
    let error = 0;

    (await PG(`${process.cwd()}/commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name) {
            const path = file.split("/");
            error++;
            await console.log("Loading command".red, path[7], "failed: Missing name.".red)
            return
        }
        if (!command.description) {
            const path = file.split("/");
            error++;
            await console.log("Loading command".red, command.name, "failed: Missing description.".red)
            return
        }
        if (command.permissions) {
            if (Perms.includes(command.permissions)) {
                command.defaultPermission = false;
            } else {
                error++;
                await console.log("Loading command".red, command.name, "failed: Invalid Permission".red)
                return
            }
        }

        client.commands.set(command.name, command);

        commandsArray.push(command);
        successful++;
    })

    await console.log("Finished with loading commands".yellow, "\nSuccessful:", successful, `\n${error > 0 ? "Error:".red : "Error:"}`, error)

    client.on("ready", async () => {

        const devGuild = client.guilds.cache.get(config.devGuild)

        if (devGuild) {
            await devGuild.commands.set(commandsArray)
        }

        commandsArray.forEach((value, index) => {
            if (value.name === "deleteallcommands") {
                commandsArray.splice(index, 1)
            }
        })

        await client.application.commands.set(commandsArray)
    })
}