const Discord = require("discord.js")

exports.help = {
    name: "tkick",
    category: "team",
    aliases: ["t-kick"],
    description: "Expulse un membre de sa team",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const teamid = req[0].team
        if(teamid == 'no') return message.reply(`:x: Vous n'appartenez à aucune team !`)
        bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(req[0].grade == "Membres" || req[0].grade == "Officier") return message.channel.send(`:warning: Vous devez être Leader de la team pour kick !`)
            const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!mention) return message.channel.send(`:warning: Utilisateur Invalide`)
            if(mention.id == message.author.id) return message.reply(":x: Vous ne pouvez pas vous kick vous-mêmes !")
            bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
            if(req.length < 1) return message.reply(`:x: ${mention.user.username} ne fait pas parti de votre team !`)
            bot.db.query(`DELETE FROM tmembers WHERE guildId = ${message.guild.id} AND userId = ${mention.id}`);
            bot.db.query(`UPDATE user SET team = "no" WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`); 
            bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
                const kickEmbed = new Discord.EmbedBuilder()
                .setDescription(`${mention.user.username} a été kick de la team **${req[0].nom}** !`)
                .setColor(color)

                message.reply({ embeds: [kickEmbed] })
            })            
        })
        })
    })
}
