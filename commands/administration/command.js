const Discord = require("discord.js")

exports.help = {
    name: "command",
    category: "administration",
    aliases: [],
    description: "Autorise/Bloque les commandes dans certains salons",
    usage: "Pas d'utilisation conseillée",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {
    if(!args[0]) return message.channel.send(`:question: Bloque ou débloque les commandes dans un salon !\nUsage: \`${bot.prefix}command <block/allow> <#channel>\``)

    if(args[0] == "block") {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!channel) return message.reply(':x: Salon invalide !')
        bot.db.query(`SELECT * FROM commandBlock WHERE guildId = ${message.guild.id} AND channelId = ${channel.id}`, async (err, req) => {
            if(req.length < 1) {
            bot.db.query(`INSERT INTO commandBlock (guildId, channelId, statut) VALUES ("${message.guild.id}", "${channel.id}", "off")`)
            message.channel.send(`\`✅\` Les commandes dans le salon ${channel} ont été désactivé !`)
            } else {
                bot.db.query(`UPDATE commandBlock SET statut = 'off' WHERE guildId = "${message.guild.id}" AND channelId = "${channel.id}"`);
                message.channel.send(`\`✅\` Les commandes dans le salon ${channel} ont été désactivé !`)
            }
        })
    }
    if(args[0] == "allow") {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!channel) return message.reply(':x: Salon invalide !')
        bot.db.query(`SELECT * FROM commandBlock WHERE guildId = ${message.guild.id} AND channelId = ${channel.id}`, async (err, req) => {
            if(req.length < 1) {
            bot.db.query(`INSERT INTO commandBlock (guildId, channelId, statut) VALUES ("${message.guild.id}", "${channel.id}", "on")`)
            message.channel.send(`\`✅\` Les commandes dans le salon ${channel} sont réactivées !`)
            } else {
                bot.db.query(`UPDATE commandBlock SET statut = 'on' WHERE guildId = "${message.guild.id}" AND channelId = "${channel.id}"`);
                message.channel.send(`\`✅\` Les commandes dans le salon ${channel} sont réactivées !`)
            }
        })
    }
}