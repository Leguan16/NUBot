/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 * https://github.com/Leguan16/NUBot/blob/master/LICENSE.md
 */

const {CommandInteraction, MessageEmbed, RoleManager, GuildMember} = require("discord.js")
const {GuildPremiumTier} = require("discord-api-types/v8")
const {client} = require("../../main")

module.exports = {
    name: "serverinfo",
    description: "get info about the guild",
    async execute(interaction) {
        serverInfo(interaction).catch(reason => {
            console.error(reason)
            interaction.reply("an error occurred")
        })
    },
    serverInfo
}

/**
 *
 * @param {CommandInteraction} interaction
 * @requires {RoleManager, GuildMember, GuildPremiumTier, client}
 * @returns {Promise<void>}
 */
async function serverInfo(interaction) {
    const guild = client.guilds.cache.get(interaction.guildId)
    const owner = await guild.fetchOwner({cache: true})
    const roles = await guild.roles.fetch();
    let rolesMention = "";
    await roles.forEach(role => {
        if (role.name !== "everyone") {
            rolesMention += "<@&" + role.id + "> "
        }
    })

    //console.log(guild)
    //console.log(client)
    const embed = new MessageEmbed()
        .setColor("#0070cc")
        .setTitle("Serverinfo")
        .setDescription("Information about the guild")
        .setTimestamp(Date.now())
        .setFooter("Serverinfo by " + client.user.username, client.user.avatarURL({size: 4096}))
        .setThumbnail(guild.iconURL({size: 4096}),)
        .addField("Name:", guild.name)
        .addField("Member count:", guild.memberCount.toString())
        .addField("Date Created:", guild.createdAt.toDateString())
        .addField("Owner:", `${owner}`)
        .addField("Roles:", rolesMention)

    if (guild.premiumSubscriptionCount) {
        let boostLevel = 0

        switch (guild.premiumTier) {
            case "NONE":
                boostLevel = 0
                break
            case "TIER_1":
                boostLevel = 1
                break
            case "TIER_2":
                boostLevel = 2
                break
            case "TIER_3":
                boostLevel = 3
                break
        }

        embed
            .addField("Server boost level:", boostLevel.toString())
            .addField("Active server boosts:", guild.premiumSubscriptionCount.toString())
    }

    interaction.reply({embeds: [embed]})
}