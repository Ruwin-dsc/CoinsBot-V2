const Discord = require("discord.js")

exports.help = {
    name: "tbuy",
    category: "team",
    aliases: ["tbought"],
    description: "Permets d'acheter les items du shop de team",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    if(args[0] == "cadena") {
        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(req[0].team == "no") return message.channel.send(`:x: Vous n'avez pas de team !`)
            const teamId = req[0].team
            bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${req[0].team}"`, async (err, req) => {
                if(req[0].cadenas == "5") return message.channel.send(`:x: La team a atteint sa limite de **cadenas**`)

                const norep = new Discord.EmbedBuilder()
                .setDescription(`:x: La team a besoin de 2 rep pour acheter un **cadena**`)
                .setColor(color)

                if(req[0].reputation < 2) return message.reply({ embeds: [norep]})

                const newrep = Number(req[0].reputation) - 2
                const cadenas = Number(req[0].cadenas) + 1

                const buycadenas = new Discord.EmbedBuilder()
                .setDescription(`:white_check_mark: Vous avez acheté un cadena pour \`2 rep team\``)
                .setColor(color)

                bot.db.query(`UPDATE team SET reputation = '${newrep}', cadenas = '${cadenas}' WHERE guildId = '${message.guild.id}' AND id = '${teamId}'`)

                message.reply({ embeds: [buycadenas] })

            })
        })
    } else {
        const shopEmbed = Discord.EmbedBuilder()
        .setTitle(`Voici la boutique des teams du serveur ${message.guild.name}`)
        .setDescription(`**cadena**\nPrix: 2 rep`)
        .setColor(color)
        .setFooter({ text: `Les items sont payés avec les rep de team` })

        message.channel.send({ embeds: [shopEmbed] })
    }

}