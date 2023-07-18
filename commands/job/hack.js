const Discord = require("discord.js")

const cooldownTime = 1 * 0 * 0;

const cooldownshack = new Map();

exports.help = {
    name: "hack",
    category: "job",
    aliases: [],
    description: "Commande du métier hacker",
    usage: "hack <team id>"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const nohacker = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous devez être **hacker** pour utiliser cette commande !`)
        .setColor(color)
        if(req[0].hacker == "no") return message.channel.send({ embeds: [nohacker] })


    if (cooldownshack.has(message.author.id + message.guild.id)) {
        const cooldownExpiration = cooldownshack.get(message.author.id + message.guild.id) + cooldownTime;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez déjà \`hack\` récemment\n\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
            .setFooter(bot.footer)
            .setColor(color)


            return message.reply({ embeds: [CouldownEmbed] });
        }
    }

    if(!args[0]) return message.reply(`:x: \`ERROR:\` Veuillez mentionner un membre ou préciser l'ID d'une team !`)
    if(message.mentions.members.first() || message.guild.members.cache.get(args[0])) {
        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const teamid = req[0].team
        if(teamid == 'no') return message.reply(`:x: Pas de team trouvé !`)
        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
            const cadenas = req[0].cadenas
            const nocadenas = new Discord.EmbedBuilder()
            .setDescription(`:x: La team \`${req[0].nom}\` n'a plus de cadenas !`)
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            if (cadenas == "0") return message.channel.send({ embeds: [nocadenas] })
            const random = Math.random();
            if (random < 0.5) {
            const ggembed = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous avez hack la team \`${req[0].nom}\` !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1128972800363860048/209037.gif?width=2912&height=1638`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

            const newCadenas = Number(cadenas) - 1

            bot.db.query(`UPDATE team SET cadenas = '${newCadenas}' WHERE guildId = '${message.guild.id}' AND id = '${teamid}'`)
            cooldownshack.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({embeds: [ggembed]})
            } else {
            bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
            const cadenas = req[0].cadenas
            const nocadenas = new Discord.EmbedBuilder()
            .setDescription(`:x: La team \`${req[0].nom}\` n'a plus de cadenas !`)
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            if (cadenas == "0") return message.channel.send({ embeds: [nocadenas] })
            const ggembed = new Discord.EmbedBuilder()
            .setDescription(`:bank: Vous n'avez pas réussi à hack la team \`${req[0].nom}\` !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1128974346594046023/giphy-downsized-large.gif?width=960&height=540`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

            cooldownshack.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({embeds: [ggembed]})
                })
            }
        })
    })

    } else {
        const teamid = args[0]
        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${args[0]}"`, async (err, req) => {
            if(req.length < 1) return message.channel.send(`:x: Pas de team trouvé avec l'identifiant \`${args[0]}\` !`)
            const cadenas = req[0].cadenas
            const nocadenas = new Discord.EmbedBuilder()
            .setDescription(`:x: La team \`${req[0].nom}\` n'a plus de cadenas !`)
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            if (cadenas == "0") return message.channel.send({ embeds: [nocadenas] })
            const random = Math.random();
            if (random < 0.5) {
            const ggembed = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous avez hack la team \`${req[0].nom}\` !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1128972800363860048/209037.gif?width=2912&height=1638`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

            const newCadenas = Number(cadenas) - 1

            bot.db.query(`UPDATE team SET cadenas = '${newCadenas}' WHERE guildId = '${message.guild.id}' AND id = '${teamid}'`)
            cooldownshack.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({embeds: [ggembed]})
            } else {
            bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
            const cadenas = req[0].cadenas
            const nocadenas = new Discord.EmbedBuilder()
            .setDescription(`:x: La team \`${req[0].nom}\` n'a plus de cadenas !`)
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            if (cadenas == "0") return message.channel.send({ embeds: [nocadenas] })
            const ggembed = new Discord.EmbedBuilder()
            .setDescription(`:bank: Vous n'avez pas réussi à hack la team \`${req[0].nom}\` !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1128974346594046023/giphy-downsized-large.gif?width=960&height=540`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

            cooldownshack.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({embeds: [ggembed]})
            })
            }
        })

    }
})

}