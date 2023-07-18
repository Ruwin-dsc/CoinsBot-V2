const Discord = require("discord.js")

exports.help = {
    name: "unwl",
    category: "administration",
    aliases: ["unwhitelist"],
    description: "Retire un membre à la whitelist",
    usage: "unwl <@user/id>",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send('`❌` `ERROR:` Pas de membre trouvé !')
        bot.db.query(`SELECT * FROM list WHERE guildId = "${message.guild.id}" AND whitelistId = "${user.id}"`, async (err, req) => {
            if (req.length < 1) {
                return message.channel.send("`❌` `ERROR:` Cette utilisateur n'est pas dans la whitelist du bot !")
            } else {
                bot.db.query(`DELETE FROM list WHERE guildId = ${message.guild.id} AND whitelistId = ${user.id}`);
                
                message.reply(`\`✅\` ${user.user.username} n'est plus dans la whitelist du bot !`)
            }
        })
}