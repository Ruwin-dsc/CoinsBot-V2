const Discord = require("discord.js")

exports.help = {
    name: "cshop",
    category: "récompenses",
    aliases: ["servershop", "customshop"],
    description: "Shop de rôle du serveur",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    message.reply(`:x: Aucun item n'a été ajouté au shop du serveur !\nUtilisez la commande \`items\` pour en ajouter !`)
}
