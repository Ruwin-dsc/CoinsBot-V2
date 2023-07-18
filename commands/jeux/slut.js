const Discord = require("discord.js")

exports.help = {
    name: "slut",
    category: "jeux",
    aliases: ["st"],
    description: "Fais gagner une somme de coins",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {

    const slutembed = new Discord.EmbedBuilder()
    .setDescription(`:x: Vous devez votez pour utiliser cette commande !\n[Cliquez ici pour voter](${bot.whitehall})`)
    .setFooter(bot.footer)
    .setColor(color)

    message.reply({ embeds: [slutembed] })

}