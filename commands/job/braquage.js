const Discord = require("discord.js")

const cooldownTime = 3 * 75 * 60;

const cooldownsbraquage = new Map();
const cooldownTime2 = 2 * 60 * 60;

exports.help = {
    name: "braquage",
    category: "job",
    aliases: ["tbraquage"],
    description: "Braque la banque d'un autre joueur",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsrob, coinsuser, coinsauthor;
    bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const nobraqueur = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous devez être **braqueur** pour utiliser cette commande !`)
        .setColor(color)
        if(req[0].braqueur == "no") return message.channel.send({ embeds: [nobraqueur] })


    if (cooldownsbraquage.has(message.author.id + message.guild.id)) {
        const cooldownExpiration = cooldownsbraquage.get(message.author.id + message.guild.id) + cooldownTime;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez déjà \`braquage\` récemment\n\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
            .setFooter(bot.footer)
            .setColor(color)


            return message.reply({ embeds: [CouldownEmbed] });
        }
    }

    if(!args[0]) return message.reply(`:x: \`ERROR:\` Veuillez mentionner un membre ou préciser l'ID d'une team !`)
    if(message.mentions.members.first() || message.guild.members.cache.get(args[0])) {
        mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(mention.id == message.author.id) return message.reply(`:x: Vous ne pouvez pas vous braquez pour vous-même !`)

        if (bot.antirob.has(mention.id + message.guild.id)) {
        const cooldownExpiration = bot.antirob.get(mention.id + message.guild.id) + cooldownTime2;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`:shield: Vous ne pouvez pas braquer cet utilisateur\n\nSon anti-rob prendra fin dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
            .setFooter(bot.footer)
            .setColor(color)


            return message.reply({ embeds: [CouldownEmbed] });
        }
    }
        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
            if(req.length < 1) return message.reply(':x: Cette utilisateur n\'a pas encore commencer les coins dîtes lui d\'envoyer un message !')
            const coins = req[0].banque
            const nomoney = new Discord.EmbedBuilder()
            .setDescription(`:x: ${mention.user.username} n'a pas d'argent à braquer !`)
            .setColor(color)
            .setFooter(bot.footer)
            if(coins == "0") return message.reply({ embeds: [nomoney] })

         bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        
        const random = Math.random();
            if (random < 0.5) {
            const rob = Math.floor(Math.random() * (Number(coins) - 0 + 1)) + 0;
            coinsuser = Number(coins) - Number(rob)
            coinsauthor = Number(req[0].coins) + Number(rob)
            const ggembed = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous avez braqué ${mention} et repartez avec \`${rob} coins\` en plus`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1129110873244446790/tenor.gif?width=996&height=556`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

            bot.db.query(`UPDATE user SET coins = '${coinsauthor}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
             bot.db.query(`UPDATE user SET banque = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND userId = '${mention.id}'`)
            cooldownsbraquage.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({embeds: [ggembed]})
            } else {
            const ggembed = new Discord.EmbedBuilder()
            .setDescription(`:bank: Vous n'avez pas réussi à braquer **${mention.user.username}** !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1129134150205579424/braquages-rigolos-17.gif?width=1040&height=640`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

            cooldownsbraquage.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({embeds: [ggembed]})
            }
        })
      })
    } else {
        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const coinsauthors = req[0].coins
       bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${args[0]}"`, async (err, req) => {
        if(req.length < 1) return message.channel.send(`:x: Pas de team trouvé avec l'identifiant \`${args[0]}\``)
        const embedCadenas = new Discord.EmbedBuilder()
        .setColor(color)
        .setDescription(`:lock: La team ${req[0].nom} lui reste **${req[0].cadenas} cadena(s)** qui la protège des braquages !`)
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        
        if(req[0].cadenas !== "0") return message.reply({ embeds: [embedCadenas] })  
        const coins = req[0].coins
        const random = Math.random();
            if (random < 0.5) {
            const rob = Math.floor(Math.random() * (Number(coins) - 0 + 1)) + 0;
            coinsuser = Number(coins) - Number(rob)
            coinsauthor = Number(coinsauthors) + Number(rob)
            const ggembed = new Discord.EmbedBuilder()          
            .setDescription(`:white_check_mark: Vous avez braqué la team ${req[0].nom} et repartez avec \`${rob} coins\` en plus`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1129110873244446790/tenor.gif?width=996&height=556`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

            bot.db.query(`UPDATE user SET coins = '${coinsauthor}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE team SET coins = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND id = '${args[0]}'`)
            cooldownsbraquage.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({embeds: [ggembed]})
            } else {
            const ggembed = new Discord.EmbedBuilder()
            .setDescription(`:bank: Vous n'avez pas réussi à braquer la team ${req[0].nom} !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1129134150205579424/braquages-rigolos-17.gif?width=1040&height=640`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

            cooldownsbraquage.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({embeds: [ggembed]})
            }
        
        

       })
    })
    } 
})

}