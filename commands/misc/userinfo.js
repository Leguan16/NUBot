/*
 * Copyright (c) 2021. Leguan16
 * https://github.com/Leguan16
 */
const {CommandInteraction, MessageEmbed, RoleManager, GuildMember, GuildMemberRoleManager} = require("discord.js")
const {ApplicationCommandOptionType} = require("discord-api-types/v8");
const {client} = require("../../main");

module.exports = {
    name: "userinfo",
    description: "get info about a specific user",
    options: [
        {
            name: "user",
            description: "the user to display the info",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        await userInfo(interaction).catch(error => {
            console.log(error)
            interaction.reply("an error occurred")
        })
    },
    userInfo
}

/**
 *
 * @param {CommandInteraction} interaction
 * @requires {RoleManager, GuildMember, GuildMemberRoleManager}
 * @returns {Promise<void>}
 */
async function userInfo(interaction) {
    const user = await interaction.options.getUser("user").fetch()
    const guildMember = await interaction.options.getMember("user")

    if (user) {
        const embed = new MessageEmbed()
            .setColor("#0070cc")
            .setTitle("Userinfo")
            .setDescription("Information about user <@" + user.id + ">")
            .setTimestamp(Date.now())
            .setFooter("Userinfo by " + client.user.username, client.user.avatarURL({size: 4096}))
            .setThumbnail(user.avatarURL({size: 4096}))
            .addField("Name:", user.username + "#" + user.discriminator, true)

        if (guildMember.nickname) {
            embed
                .addField("Nickname:", guildMember.nickname, true)
        }

        embed
            .addField("Joined at:", guildMember.joinedAt.toDateString())
            .addField("Account created:", user.createdAt.toDateString())

        if (guildMember.premiumSince) {
            embed.addField("Boosting server since:", guildMember.premiumSince.toDateString())
        }

        const roles = await guildMember.roles.cache;
        let roleMentions = ""
        roles.forEach(role => {
            if (role.name !== "everyone") {
                roleMentions += `${role} `
            }
        })

        if (roleMentions) {
            embed.addField("Roles:", roleMentions)
        }

        interaction.reply({embeds: [embed],})

    } else {
        interaction.reply("Invalid user provided")
    }
}