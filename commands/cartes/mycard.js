const Discord = require("discord.js")

exports.help = {
    name: "mycard",
    category: "cartes",
    aliases: ["cards", "card", "mycards"],
    description: "Affiche les cartes",
    usage: "mycards"
}

exports.run = async (bot, message, args, color) => {
    message.reply(`:x: Le système de carte est désactivé, vous ne pouvez plus collecter de cartes.`)
}