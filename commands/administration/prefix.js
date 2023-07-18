const Discord = require("discord.js")

exports.help = {
    name: "prefix",
    category: "administration",
    aliases: ["set-prefix", "setprefix"],
    description: "Modifie le prefix du bot",
    usage: "Pas d'utilisation conseillée",
    permission: "administrator"
}

exports.run = async (bot, message, args, color) => {
    const prefix = args[0]
    if(!prefix) return message.reply(`:x: Merci d'indiquer un préfix valide !`)

    bot.db.query(`UPDATE guild SET prefix = '${prefix}' WHERE guildId = "${message.guild.id}"`);

    message.reply(`Le préfix du serveur est maintenant: \`${prefix}\``)
}