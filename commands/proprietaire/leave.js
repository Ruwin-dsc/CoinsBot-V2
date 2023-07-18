const Discord = require("discord.js")

exports.help = {
    name: "leave",
    category: "administration",
    aliases: ["left"],
    description: "Quitte un serveur",
    usage: "Pas d'utilisation conseillée",
    permission: "buyer"
}

exports.run = async (bot, message, args, color) => {
    const IDServer = args[0]
    if(!IDServer) return message.reply(":x: Merci de renseigner un identifiant !")

    const guild = bot.guilds.cache.get(IDServer)
    if(!guild) return message.reply(":x: Serveur invalide")

    guild.leave().then(() => {
        message.channel.send(`J'ai quitté le serveur ${guild.name} \`${guild.id}\` avec succès !`)
    })
} 