const Discord = require("discord.js")

exports.help = {
    name: "mybot",
    category: "administration",
    aliases: ["my-bot" , "bot"],
    description: "Donne les informations du bot",
    usage: "Pas d'utilisation conseillée",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {
    const embed = new Discord.EmbedBuilder()
    .setTitle(`Vos bots`)
    .setDescription(`[${bot.user.username}](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot%20applications.commands) : <t:1727388000:f>`)
    .setFooter({ text: `CoinsBot by WhiteHall` })
    .setColor(color)

    message.reply({ embeds: [embed] })

}