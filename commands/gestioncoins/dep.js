const Discord = require("discord.js")

exports.help = {
    name: "dep",
    category: "gestioncoins",
    aliases: ["deposit"],
    description: "Dépose votre argent en banque",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsuser;
    let bankuser;

    if(!args[0]) return message.reply(`:x: Merci de préciser un montant à déposer`)

    if(args[0] == "all") {

        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')

        const nomoney = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous n'avez pas d'argent à déposer !`)
        .setColor(color)

        if(Number(req[0].coins) == 0) return message.reply({ embeds: [nomoney] })

        coinsuser = Number(req[0].coins) - Number(req[0].coins)
        bankuser = Number(req[0].banque) + Number(req[0].coins)

        await bot.db.query(`UPDATE user SET coins = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        await bot.db.query(`UPDATE user SET banque = '${bankuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

        const depositembed = new Discord.EmbedBuilder()
        .setDescription(`:coin: ${message.author.username}, vous avez déposé \`${req[0].coins} coins\` dans votre banque !`)
        .setColor(color)

        message.channel.send({ embeds: [depositembed]})
       
      })

    } else if(Number(args[0])) {

        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')

        const nomoney = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous n'avez pas d'argent à déposer !`)
        .setColor(color)

        if(Number(args[0]) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")

        if(Number(req[0].coins) == 0) return message.reply({ embeds: [nomoney] })

        if(Number(req[0].coins) < Number(args[0])) return message.reply(":x: Vous n'avez pas tous cette argent !")

        coinsuser = Number(req[0].coins) - Number(args[0])
        bankuser = Number(req[0].banque) + Number(args[0])

        await bot.db.query(`UPDATE user SET coins = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        await bot.db.query(`UPDATE user SET banque = '${bankuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

        const depositembed = new Discord.EmbedBuilder()
        .setDescription(`:coin: ${message.author.username}, vous avez déposé \`${args[0]} coins\` dans votre banque !`)
        .setColor(color)

        message.channel.send({ embeds: [depositembed]})
        })

    } else {
        message.reply(`:x: Ceci n'est pas un chiffre valide !`)
    }

}
