const Discord = require("discord.js")

exports.help = {
    name: "cambriolage",
    category: "job",
    aliases: [],
    description: "Cambriole l'entrepot d'un membre",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const nohacker = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous devez être **cambrioleur** pour utiliser cette commande !`)
        .setColor(color)
        if(req[0].cambrioleur == "no") return message.channel.send({ embeds: [nohacker] })

        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!mention) return message.reply(`:x: \`ERROR:\` Pas de membre trouvé !`)

        bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
            const nocoins = new Discord.EmbedBuilder()
            .setDescription(`:x: ${mention.user.username} n'a rien ou pas assez à cambrioler (0) !`)
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})

        })
    })

}