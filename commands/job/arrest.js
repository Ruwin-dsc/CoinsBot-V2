const Discord = require("discord.js")

exports.help = {
    name: "arrest",
    category: "job",
    aliases: [],
    description: "Commande du métier policier",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const nobraqueur = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous devez être **policier** pour utiliser cette commande !`)
        .setColor(color)
        if(req[0].policier == "no") return message.channel.send({ embeds: [nobraqueur] })

        message.delete(`Alors... Comment dire ? La commande arresy de Millenium ne marche pas... donc jpp le remade correctement ;-;`)

    })
}