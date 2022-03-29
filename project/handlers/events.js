const {Events} = require("../validation/eventNames")
const {promisify} = require("util")
const {glob} = require("glob")
const PG = promisify(glob)
const colors = require("colors")

module.exports = async (client) => {
    let successful = 0;
    let error = 0;

    (await PG(`${process.cwd()}/project/events/*/*.js`)).map(async (file) => {

        const event = require(file)

        if (!Events.includes(event.name) || !event.name) {
            const path = file.split("/");
            error += 1;
            await console.log("Loading event", `${event.name || "MISSING"}`, `Failed: Event name is either invalid or missing: ${path[6] + `/` + path[7]}`.red);
            return
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }

        successful += 1;
    })

    console.log(`Finished with loading events!`.blue, `\nSuccessful:`, successful, `\n${error > 0 ? "Error".red : "Error"}`, error)
}

