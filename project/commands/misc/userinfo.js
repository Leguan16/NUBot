const {CommandInteraction, RoleManager, GuildMember, GuildMemberRoleManager, EmbedBuilder} = require("discord.js")
const {ApplicationCommandOptionType} = require("discord-api-types/v10");
const {client} = require("../../main");

module.exports = {
    activated: true,
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
 * @requires {RoleManager, GuildMember, GuildMemberRoleManager, EmbedBuilder}
 * @returns {Promise<void>}
 */
async function userInfo(interaction) {
    const user = await interaction.options.getUser("user").fetch()
    const guildMember = await interaction.options.getMember("user")

    if (user) {
        const embed = new EmbedBuilder()
            .setColor("#0070cc")
            .setTitle("Userinfo")
            .setDescription("Information about user <@" + user.id + ">")
            .setTimestamp(Date.now())
            .setFooter({text: "Userinfo by " + client.user.username, iconURL: client.user.avatarURL({size: 4096})})
            .setThumbnail(user.avatarURL({size: 4096}))
            .addFields({ name: 'Name', value: user.username + "#" + user.discriminator, inline: true })

        if (guildMember.nickname) {
            embed
                .addFields({name: "Nickname:", value: guildMember.nickname, inline: true})
        }

        embed
            .addFields({name: "Joined at:", value: guildMember.joinedAt.toDateString()},
                {name: "Account created:", value: user.createdAt.toDateString()})

        if (guildMember.premiumSince) {
            embed.addFields({name: "Boosting server since:", value: guildMember.premiumSince.toDateString()})
        }

        const roles = await guildMember.roles.cache;
        let roleMentions = ""
        roles.forEach(role => {
            if (role.name !== "everyone") {
                roleMentions += `${role} `
            }
        })

        if (roleMentions) {
            embed.addFields({name: "Roles:", value: roleMentions})
        }

        interaction.reply({embeds: [embed],})

    } else {
        interaction.reply("Invalid user provided")
    }
}