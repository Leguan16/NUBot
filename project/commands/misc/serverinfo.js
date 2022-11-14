const {CommandInteraction, EmbedBuilder, RoleManager, GuildMember} = require("discord.js")
const {GuildPremiumTier} = require("discord-api-types/v10")
const {client} = require("../../main")

module.exports = {
    activated: true,
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
    const embed = new EmbedBuilder()
        .setColor("#0070cc")
        .setTitle("Serverinfo")
        .setDescription("Information about the guild")
        .setTimestamp(Date.now())
        .setFooter("Serverinfo by " + client.user.username, client.user.avatarURL({size: 4096}))
        .setThumbnail(guild.iconURL({size: 4096}),)
        .addFields({name: "Name:", value: guild.name},
            {name: "Member count:", value: guild.memberCount.toString()},
            {name: "Date Created:", value: guild.createdAt.toDateString()},
            {name: "Owner:", value: `${owner}`},
            {name: "Roles:", value: rolesMention});

    if (guild.premiumSubscriptionCount) {
        let boostLevel = 0

        switch (guild.premiumTier) {
            case GuildPremiumTier.None:
                boostLevel = 0
                break
            case GuildPremiumTier.Tier1:
                boostLevel = 1
                break
            case GuildPremiumTier.Tier2:
                boostLevel = 2
                break
            case GuildPremiumTier.Tier3:
                boostLevel = 3
                break
        }

        embed
            .addFields({name: "Server boost level:", value: boostLevel.toString()},
                {name: "Active server boosts:", value: guild.premiumSubscriptionCount.toString()});
    }

    interaction.reply({embeds: [embed]})
}