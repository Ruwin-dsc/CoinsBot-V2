const Discord = require("discord.js")

exports.help = {
    name: "pay",
    category: "gestioncoins",
    aliases: [],
    description: "Envois de l'argent à un autre joueur",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsauthor;
    let coinsuser;
    let coinsuserdb;
    let coinsauthordb

     const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
     if(!mention) return message.channel.send(`:x: \`ERROR:\` Pas de membre trouvé !`)
     if(mention.id == message.author.id) return message.reply(":x: Vous ne pouvez pas vous envoyer de l'argent !")

     const pasassezwhitehall = new Discord.EmbedBuilder()
     .setDescription(`:x: Vous n'avez pas d'argent à payer !`)
     .setColor(color)
     .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})

     if(!args[1]) return message.reply(`:x: Merci de préciser un montant à payer`)
     if(isNaN(args[1])) return message.reply(":x: Ceci n'est pas un chiffre valide !")
     if(Number(args[1]) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")

     bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer les coins, refaîtes la commande !')
        coinsauthor = Number(req[0].coins)   
      })

    await bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Cette utilisateur n\'a pas encore commencer les coins dîtes lui d\'envoyer un message !')
        coinsuser = Number(req[0].coins)

        coinsuserdb = coinsuser + Number(args[1])
        coinsauthordb = coinsauthor - Number(args[1])

        if(Number(coinsauthor) > Number(args[1])) {

       await bot.db.query(`UPDATE user SET coins = '${coinsauthordb}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
    await bot.db.query(`UPDATE user SET coins = '${coinsuserdb}' WHERE guildId = '${message.guild.id}' AND userId = '${mention.id}'`)


        await message.channel.send({ content: `:coin: Vous venez de payer \`${mention.user.username}\` un montant de \`${Number(args[1])} coins\`` })
        bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
          const voc = req[0].logstransac
          if(!voc) return
          if(voc == null) return
          const channelvoc = bot.channels.cache.get(voc);
          if(!channelvoc) return
          bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
          const embedLogs = new Discord.EmbedBuilder()
          .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: 'https://discord.gg/zcN3sB5KSv' })
          .setDescription(`${message.author} vient de payer \`${args[1]} coins\` à ${mention}`)
          .setTimestamp()
          .setColor(req[0].color)

          channelvoc.send({ embeds: [embedLogs] })
          })

        })
      } else {
        return message.reply({ embeds: [pasassezwhitehall]})  
      }

      })

    
}
