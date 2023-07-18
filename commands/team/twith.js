const Discord = require("discord.js")

exports.help = {
    name: "twith",
    category: "team",
    aliases: ["t-with"],
    description: "Retire de l'argent dans la banque de la team",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsuserdb;
    let userbank;
    let coinsbankdb
    let coinsuser;

        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const teamid = req[0].team
        if(teamid == 'no') return message.reply(`:x: Vous n'appartenez à aucune team !`)
        const Coins = req[0].coins

        const noargs = new Discord.EmbedBuilder()
        .setDescription(`:x: Merci de préciser un montant à retirer`)
        .setColor(color)

        bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(req[0].grade == "Membres") return message.channel.send(`:warning: Vous devez être **Créateur** de la team ou **Officier** pour retirer de l'argent !`)


    if(!args[0]) return message.reply({ embeds: [noargs]})
    if(args[0] == "all") {

        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')

        const nomoney = new Discord.EmbedBuilder()
        .setDescription(`:x: Il n'y a pas d'argent à retirer !`)
        .setColor(color)

        if(Number(req[0].coins) == 0) return message.reply({ embeds: [nomoney] })

        coinsuser = Number(req[0].coins) + Number(Coins)
        bankuser = Number(req[0].coins) - Number(req[0].coins)

        await bot.db.query(`UPDATE user SET coins = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        await bot.db.query(`UPDATE team SET coins  = '${bankuser}' WHERE guildId = '${message.guild.id}' AND id = '${teamid}'`)

        const depositembed = new Discord.EmbedBuilder()
        .setDescription(`:coin: ${message.author.username}, vous avez retiré \`${req[0].coins}\` coins de la banque de la team !`)
        .setColor(color)

        return message.channel.send({ embeds: [depositembed]})
        })

    } else if(args[0] !== "all") {
    if(isNaN(args[0])) return message.reply(":x: Ceci n'est pas un chiffre valide !")
    if(Number(args[0]) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")
    
    const nomoney = new Discord.EmbedBuilder()
    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setDescription(`:x: Il n'y a pas assez pour retirer tout cela !`)
    .setColor(color)

    bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')
        userbank = Number(req[0].coins)

        if(userbank < Number(args[0])) {
            return message.channel.send({ embeds: [nomoney] })
        } else {

            coinsbankdb = Number(userbank) - Number(args[0])
            coinsuserdb = Number(Coins) + Number(args[0])
            await bot.db.query(`UPDATE user SET coins = '${coinsuserdb}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            await bot.db.query(`UPDATE team SET coins = '${coinsbankdb}' WHERE guildId = '${message.guild.id}' AND id = '${teamid}'`)

            const withemebd = new Discord.EmbedBuilder()
            .setDescription(`:coin: ${message.author.username}, vous avez retiré \`${args[0]} coins\` de la banque de la team !`)
            .setFooter(bot.footer)
            .setColor(color)

            message.reply({ embeds: [withemebd] })

        }

       
      })
      }
    })
})

}