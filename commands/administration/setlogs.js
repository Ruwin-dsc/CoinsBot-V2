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
    if(args[0] == "xp") {
        message.reply(`Ce logs n'est pas disponible pour le moment !\nPour suivre les nouveautés du bot: https://discord.gg/3rThTcUHZr`)
    } else if(args[0] == "vocal") {
        if(!args[1]) return message.reply(':x: Veuillez **mentionner** un salon !')
        if(!message.mentions.channels.first()) return message.reply(':x: Veuillez **mentionner** un salon !')

        bot.db.query(`UPDATE logs SET logsvocal = "${message.mentions.channels.first().id}" WHERE guildId = '${message.guild.id}'`)

        message.channel.send(`${message.mentions.channels.first()} est maintenant le salon des logs vocaux !`)
    } else if(args[0] == "impots") {
        if(!args[1]) return message.reply(':x: Veuillez **mentionner** un salon !')
        if(!message.mentions.channels.first()) return message.reply(':x: Veuillez **mentionner** un salon !')

        bot.db.query(`UPDATE logs SET logsimpots = "${message.mentions.channels.first().id}" WHERE guildId = '${message.guild.id}'`)

        message.channel.send(`${message.mentions.channels.first()} est maintenant le salon des logs impôts !`)
    } else if(args[0] == "transaction") {
        if(!args[1]) return message.reply(':x: Veuillez **mentionner** un salon !')
        if(!message.mentions.channels.first()) return message.reply(':x: Veuillez **mentionner** un salon !')

        bot.db.query(`UPDATE logs SET logstransac = "${message.mentions.channels.first().id}" WHERE guildId = '${message.guild.id}'`)

        message.channel.send(`${message.mentions.channels.first()} est maintenant le salon des logs transaction !`)
    } else {
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Informations des logs`)
        .setDescription(`\`xp (pas disponible)\` : Définit les logs de palier\n\`vocal\` : Définit les logs d'activité vocale\n\`impots\` : Définit les logs d'impôts\n\`transaction\` : Définit les logs de transaction`)

        message.channel.send({ embeds: [embed] })
    } 

}
