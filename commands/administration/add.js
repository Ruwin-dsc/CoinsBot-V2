const Discord = require("discord.js")

exports.help = {
    name: "add",
    category: "administration",
    aliases: [],
    description: "Pour ajouter des coins",
    usage: "Pas d'utilisation conseillée",
    permission: "whiteList"
}

exports.run = async (bot, message, args, color) => {
    if(args[0] !== "rep") {
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!mention) return message.reply(`:warning: Utilisateur Invalide`)
    if (!args[1]) return message.reply(`:x: Merci de préciser un montant à ajouter`)
    if(isNaN(args[1])) return message.reply(":x: Ceci n'est pas un chiffre valide !")
    if(Number(args[1]) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")

    bot.db.query(`UPDATE user SET coins = coins + ${Number(args[1])} WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`);
    message.channel.send(`:coin: Vous venez de d'ajouter à ${mention.user.username} un montant de \`${args[1]} coins\``)
    } else if (args[0] == "rep") {
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if(!mention) return message.reply(`:warning: Utilisateur Invalide`)
    if (!args[2]) return message.reply(`:x: Merci de préciser un montant à ajouter`)
    if(isNaN(args[2])) return message.reply(":x: Ceci n'est pas un chiffre valide !")
    if(Number(args[2]) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")

    bot.db.query(`UPDATE user SET reputation = reputation + ${Number(args[2])} WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`);
    message.channel.send(`:small_red_triangle: Vous venez de d'ajouter à ${mention.user.username} un montant de \`${args[2]} rep\``)
    } else {
        if(!args[0]) return message.reply(`:warning: Utilisateur Invalide`)
    }
    
}