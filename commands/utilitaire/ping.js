const Discord = require("discord.js")

exports.help = {
    name: "ping",
    category: "gestioncoins",
    aliases: [],
    description: "Affiches les latences du bot",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    const msg = await message.reply(`Calcul du ping en cours...`)
    const latency = msg.createdTimestamp - message.createdTimestamp;
    const apiPing = bot.ws.ping;

    msg.edit(`Pong! :ping_pong:\nLatence d'edit: \`${latency} ms\`\nAPI: \`${apiPing} ms\``)


}