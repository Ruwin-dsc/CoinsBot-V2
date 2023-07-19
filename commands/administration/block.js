const Discord = require("discord.js")

exports.help = {
    name: "block",
    category: "administration",
    aliases: [],
    description: "Permets de bloquer les commandes add, remove et reset",
    usage: "Pas d'utilisation conseillée",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {
    if(!args[0]) return message.reply(`Veuillez précisez si vous souhaitez bloquer les ajouts d'argent \`add\` ou les \`remove\` d'argent ou les \`reset\`!`)

    if(args[0] == "add") {
        bot.db.query(`UPDATE commands SET adds = "off" WHERE guildId = '${message.guild.id}'`)
        message.reply(`La commande \`${bot.prefix}add\` a été bloqué !`)
    } else if(args[0] == "remove") {
        bot.db.query(`UPDATE commands SET remove = "off" WHERE guildId = '${message.guild.id}'`)
        message.reply(`La commande \`${bot.prefix}remove\` a été bloqué !`)
    } else if(args[0] == "reset") {
        bot.db.query(`UPDATE commands SET reset = "off" WHERE guildId = '${message.guild.id}'`)
        message.reply(`La commande \`${bot.prefix}reset\` a été bloqué !`)
    }

}
