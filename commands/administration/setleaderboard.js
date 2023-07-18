const Discord = require("discord.js")

exports.help = {
    name: "setlogs",
    category: "administration",
    aliases: ["setlb"],
    description: "Modifie le leaderboard interactif",
    usage: "Pas d'utilisation conseillée",
    permission: "whiteList"
}

exports.run = async (bot, message, args, color) => {

        message.reply(`Cette commande est en maintenance: https://discord.gg/xkebY6nsxk`)

}