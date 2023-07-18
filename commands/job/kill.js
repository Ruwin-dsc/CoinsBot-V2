const Discord = require("discord.js")

exports.help = {
    name: "kill",
    category: "job",
    aliases: ["métier"],
    description: "Commande du métier tueur",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {

    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!mention) return message.channel.send(`:x: \`ERROR:\` Pas de membre trouvé !`)

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const noReput = new Discord.EmbedBuilder()
        .setDescription(`:x: ${mention.user.username} vous ne gagnerez rien si vous tuez cette personne !`)
        .setColor(color)
        if(req[0].reputation == "0") return message.channel.send({ embeds: [noReput] })

        return message.reply(`Alors... Comment dire ? La commande kill de Millenium ne marche pas... donc jpp le remade correctement ;-;`)

    })
}