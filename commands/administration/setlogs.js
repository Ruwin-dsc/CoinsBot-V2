const Discord = require("discord.js")

exports.help = {
    name: "setlogs",
    category: "administration",
    aliases: ["set-logs"],
    description: "Modifie les logs",
    usage: "Pas d'utilisation conseillée",
    permission: "whiteList"
}

exports.run = async (bot, message, args, color) => {
    if(!args[0]) {
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Informations des logs`)
        .setDescription(`\`xp\` : Définit les logs de palier\n\`vocal\` : Définit les logs d'activité vocale\n\`impots\` : Définit les logs d'impôts\n\`cards\` : Définit les logs de drop de carte\n\`transaction\` : Définit les logs de transaction`)

        message.channel.send({ embeds: [embed] })
        message.reply(`Cette commande est en maintenance: https://discord.gg/xkebY6nsxk`)
    }

}