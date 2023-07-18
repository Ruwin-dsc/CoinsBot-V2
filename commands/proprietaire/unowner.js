const Discord = require("discord.js")

exports.help = {
    name: "unowner",
    category: "administration",
    aliases: [],
    description: "Retire un owner",
    usage: "unowner <@user/id>",
    permission: "buyer"
}

exports.run = async (bot, message, args, color) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send('`❌` `ERROR:` Pas de membre trouvé !')
        bot.db.query(`SELECT * FROM list2 WHERE guildId = "${message.guild.id}" AND whitelistId = "${user.id}"`, async (err, req) => {
            if (req.length < 1) {
                return message.channel.send("`❌` `ERROR:` Cette utilisateur n'est pas owner du bot !")
            } else {
                bot.db.query(`DELETE FROM list2 WHERE guildId = ${message.guild.id} AND whitelistId = ${user.id}`);
                
                message.reply(`\`✅\` ${user.user.username} n'est plus owner du bot !`)
            }
        })
}