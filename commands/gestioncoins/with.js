const Discord = require("discord.js")

exports.help = {
    name: "with",
    category: "gestioncoins",
    aliases: ["wh", "without"],
    description: "retire de l'argent de votre banque",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    if(!args[0]) return message.reply(`:x: Merci de préciser un montant à payer`)
    if(args[0] == "all") {

        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')

        const nomoney = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous n'avez pas d'argent à retirer !`)
        .setColor(color)

        if(Number(req[0].banque) == 0) return message.reply({ embeds: [nomoney] })

        const coinsuser = Number(req[0].coins) + Number(req[0].banque)
        const bankuser = Number(req[0].banque) - Number(req[0].banque)

        await bot.db.query(`UPDATE user SET coins = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        await bot.db.query(`UPDATE user SET banque = '${bankuser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

        const depositembed = new Discord.EmbedBuilder()
        .setDescription(`:coin: ${message.author.username}, vous avez retiré \`${req[0].banque}\` coins dans votre banque !`)
        .setColor(color)

        return message.channel.send({ embeds: [depositembed]})
        })

    } else if(args[0] !== "all") {
    if(isNaN(args[0])) return message.reply(":x: Ceci n'est pas un chiffre valide !")
    if(Number(args[0]) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")
    
    const nomoney = new Discord.EmbedBuilder()
    .setFooter(bot.footer)
    .setDescription(`:x: Vous n'avez pas tout cet argent !`)
    .setColor(color)

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')
        const userbank = req[0].banque
        const usercoins = req[0].coins

        if(userbank < Number(args[0])) {
            return message.channel.send({ embeds: [nomoney] })
        } else {

            const coinsbankdb = Number(userbank) - Number(args[0])
            const coinsuserdb = Number(usercoins) + Number(args[0])
            await bot.db.query(`UPDATE user SET coins = '${coinsuserdb}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            await bot.db.query(`UPDATE user SET banque = '${coinsbankdb}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            const withemebd = new Discord.EmbedBuilder()
            .setDescription(`:coin: ${message.author.username}, vous avez retiré \`${args[0]} coins\` de votre banque`)
            .setFooter(bot.footer)
            .setColor(color)

            message.reply({ embeds: [withemebd] })

        }

       
      })
      }

}
