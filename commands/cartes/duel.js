const Discord = require("discord.js")

exports.help = {
    name: "mycard",
    category: "cartes",
    aliases: ["cduel"],
    description: "Lance un duel de cartes",
    usage: "cduel"
}

exports.run = async (bot, message, args, color) => {
    let coinsauthor;
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
     if(!mention) return message.channel.send(`:x: \`ERROR:\` Pas de membre trouvé !`)
     if(mention.id == message.author.id) return message.reply(":x: Vous ne pouvez pas vous envoyer de l'argent !")

     const pasassezwhitehall = new Discord.EmbedBuilder()
     .setDescription(`:x: Vous n'avez pas assez de coins`)
     .setFooter(bot.footer)
     .setColor(color)

     if(!args[1]) return message.reply(`:x: Merci de préciser un montant à payer`)
     if(isNaN(args[1])) return message.reply(":x: Ceci n'est pas un chiffre valide !")
     if(Number(args[1]) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")

     bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer les coins, refaîtes la commande !')
        coinsauthor = Number(req[0].coins)   
        if(coinsauthor < Number(args[1])) return message.reply({ embeds: [pasassezwhitehall] })
      })

      message.reply(`:x: Vous n'avez pas de carte pour lancer un duel !`)
}