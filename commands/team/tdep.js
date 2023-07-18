const Discord = require("discord.js")

exports.help = {
    name: "tdep",
    category: "team",
    aliases: ["t-dep"],
    description: "Dépose de l'argent dans la banque de la team",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsuser;
    let bankuser;

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const teamid = req[0].team
        if(teamid == 'no') return message.reply(`:x: Vous n'appartenez à aucune team !`)

        const noargs = new Discord.EmbedBuilder()
        .setDescription(`:x: Merci de préciser un montant à déposer`)
        .setColor(color)

    if(!args[0]) return message.reply({ embeds: [noargs]})

    if(args[0] == "all") {

        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')

        const nomoney = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous n'avez pas d'argent à déposer !`)
        .setColor(color)

        if(Number(req[0].coins) == 0) return message.reply({ embeds: [nomoney] })
        const Coins = req[0].coins
        const team = req[0].team

        coinsuser = Number(req[0].coins) - Number(req[0].coins)
        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${team}"`, async (err, req) => {
        bankuser = Number(req[0].coins) + Number(Coins)

        await bot.db.query(`UPDATE user SET coins = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        await bot.db.query(`UPDATE team SET coins = '${bankuser}' WHERE guildId = '${message.guild.id}' AND id = '${team}'`)

        const depositembed = new Discord.EmbedBuilder()
        .setDescription(`:coin: ${message.author.username}, vous avez déposé \`${Coins} coin\` dans la banque de votre team !`)
        .setColor(color)
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})

        message.channel.send({ embeds: [depositembed]})

        })
       
      })

    } else if(Number(args[0])) {

        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')

        const nomoney = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous n'avez pas d'argent à déposer !`)
        .setColor(color)

        if(Number(args[0]) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")

        if(Number(req[0].coins) == 0) return message.reply({ embeds: [nomoney] })

        coinsuser = Number(req[0].coins) - Number(args[0])
        const team = req[0].team

        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${team}"`, async (err, req) => {
        bankuser = Number(req[0].coins) + Number(args[0])

        await bot.db.query(`UPDATE user SET coins = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        await bot.db.query(`UPDATE team SET coins = '${bankuser}' WHERE guildId = '${message.guild.id}' AND id = '${team}'`)

        const depositembed = new Discord.EmbedBuilder()
        .setDescription(`:coin: ${message.author.username}, vous avez déposé \`${args[0]} coins\` dans votre banque !`)
        .setColor(color)
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})

        message.channel.send({ embeds: [depositembed]})
        })
    })

    } else {
        message.reply(`:x: Ceci n'est pas un chiffre valide !`)
    }
})

}