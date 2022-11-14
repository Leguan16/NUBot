const FILE_SYSTEM = require("fs");
let config;

function init() {

    //todo try catch if file does not exist
    config = JSON.parse(FILE_SYSTEM.readFileSync(`${process.cwd()}/config.json`, 'utf8'))

    if (!config) {
        console.log("config.json is missing. Please create a file named 'config.json' or copy and rename the 'config_example.json' to 'config.json".red)
        config = JSON.parse(FILE_SYSTEM.readFileSync(`${process.cwd()}/config.json`, 'utf8'))
    }
}

function save(json = config) {
    const data = JSON.stringify(json, null, 4)
    FILE_SYSTEM.writeFileSync(`${process.cwd()}/config.json`, data, {encoding: "utf8"})
    init();
}

function writeValue(path, value) {
    config[path] = value
    save(config)
}

function getConfig() {
    return config
}

function getValue(path) {

    let paths = path.split(".");

    console.log(paths.type)

    let value = config[paths[0]];

    for (const pathsKey in paths) {
        value = value[pathsKey];
    }
}

module.exports = {
    getConfig,
    init,
    writeValue,
    save,
    getValue
}

