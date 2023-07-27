const Discord = require("discord.js")

exports.help = {
    name: "setxp",
    category: "administration",
    aliases: ["set-xp"],
    description: "Modifie le gain d'xp",
    usage: "Pas d'utilisation conseillée",
    permission: "whiteList"
}

exports.run = async (bot, message, args, color) => {


    if(args[0] = "msg") {
        if(!args[1]) return message.reply(`:x: Veuillez préciser un gain d'xp valide`)
        if(isNaN(args[1])) return message.reply(`:x: Veuillez préciser un gain d'xp valide`)

        bot.db.query(`UPDATE xp SET xp = 'on', msg = "${args[1]}" WHERE guildId = '${message.guild.id}'`)

        const embed = new Discord.EmbedBuilder()
        .setColor(color)
        .setDescription(`:small_orange_diamond: Le gain d'expérience par 15min de vocal a été modifié en ${args[1]} !`)

        message.channel.send({ embeds: [embed] })
    } else if(args[0] = "vocal") {
        if(!args[1]) return message.reply(`:x: Veuillez préciser un gain d'xp valide`)
        if(isNaN(args[1])) return message.reply(`:x: Veuillez préciser un gain d'xp valide`)

        bot.db.query(`UPDATE xp SET xp = 'on', vocal = "${args[1]}" WHERE guildId = '${message.guild.id}'`)

        const embed = new Discord.EmbedBuilder()
        .setColor(color)
        .setDescription(`:small_orange_diamond: Le gain d'expérience par message a été modifié en ${args[1]} !`)

        message.channel.send({ embeds: [embed] })
    } else if(args[0] = "off") {
        bot.db.query(`UPDATE xp SET xp = 'off', WHERE guildId = '${message.guild.id}'`)

        const embed = new Discord.EmbedBuilder()
        .setColor(color)
        .setDescription(`:small_orange_diamond: Le système d'expérience vient d'être désactivé !`)

        message.channel.send({ embeds: [embed] })
    } else {
       const embed = new Discord.EmbedBuilder()
        .setTitle(`Configuration de l'xp (pas dispo)`)
        .setDescription(`Pour changer le gain d'expérience par message envoyé, utilisez \`setxp msg <xp>\`\nPour changer les gains d'expérience grâce à l'activité vocale toutes les 15 minutes, utilisez \`setxp vocal <xp>\`\nPour désactiver le système d'expérience, utilisez \`setxp off\``)
        .setColor(color)
        .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129786043701395576/1171-mc-xp.png?width=398&height=398`)

        message.channel.send({ embeds: [embed] })
    }
}
