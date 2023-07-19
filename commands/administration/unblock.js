const Discord = require("discord.js")

exports.help = {
    name: "unblock",
    category: "administration",
    aliases: [],
    description: "Re-active l'ajout de coins",
    usage: "Pas d'utilisation conseillée",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {
    if(!args[0]) return message.reply(`Veuillez précisez si vous souhaitez débloquer les ajouts d'argent \`add\` ou les \`remove\` d'argent ou les \`reset\`!`)

    if(args[0] == "add") {
        bot.db.query(`UPDATE commands SET adds = "on" WHERE guildId = '${message.guild.id}'`)
        message.reply(`La commande \`${bot.prefix}add\` a été débloqué !`)
    } else if(args[0] == "remove") {
        bot.db.query(`UPDATE commands SET remove = "on" WHERE guildId = '${message.guild.id}'`)
        message.reply(`La commande \`${bot.prefix}remove\` a été débloqué !`)
    } else if(args[0] == "reset") {
        bot.db.query(`UPDATE commands SET reset = "on" WHERE guildId = '${message.guild.id}'`)
        message.reply(`La commande \`${bot.prefix}reset\` a été débloqué !`)
    }

}
