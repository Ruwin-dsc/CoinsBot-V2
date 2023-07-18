const Discord = require("discord.js")

exports.help = {
    name: "setgain",
    category: "administration",
    aliases: ["set-gain", "setgains"],
    description: "Modifie les gains",
    usage: "setgain <vocal/cam/bar/work...> 100",
    permission: "whiteList"
}

exports.run = async (bot, message, args, color) => {
    if(!args[0]) {
    const embedDepart = new Discord.EmbedBuilder()
    .setTitle(`:coin: Configuration des gains`)
    .setDescription(`Pour changer le gain via les commandes débutants work et daily utilisez les commandes suivantes :\n\`${bot.prefix}setgain <work/daily> <gain_minimum> <gain_maximum>\`\n\nPour changer le gain d'argent via les bâtiments toutes les 3 heures utilisez les commandes suivantes :\n\`${bot.prefix}setgain <bar/garage/magasin/cinéma/gare/mairie> <gain>\`\n\nPour changer les gains d'activité vocal toutes les 15 minutes utilisez les commandes suivantes :\n\`${bot.prefix}setgain <vocal/stream/cam> <gain/off>\``)
    .setColor(color)
    .setFooter(bot.footer)

    message.channel.send({ embeds: [embedDepart] })
    }
    if(args[0] == "work") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(!args[2]) return message.channel.send(`:x: Arguments invalides !`)
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")
        if(isNaN(args[2])) return message.reply(":x: Arguments invalides !")
        if(Number(args[2]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET workmin = '${args[1]}', workmax = '${args[2]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" ont été modifiés.\n\nGain minimum : ${args[1]}\nGain maximum : ${args[2]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
    } else if(args[0] == "daily") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(!args[2]) return message.channel.send(`:x: Arguments invalides !`)
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")
        if(isNaN(args[2])) return message.reply(":x: Arguments invalides !")
        if(Number(args[2]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET dailymin = '${args[1]}', dailymax = '${args[2]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" ont été modifiés.\n\nGain minimum : ${args[1]}\nGain maximum : ${args[2]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
    } else if(args[0] == "bar") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET bar = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
    } else if(args[0] == "garage") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET garage = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
    } else if(args[0] == "magasin") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET magasin = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
    } else if(args[0] == "cinéma") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET cinéma = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
    } else if(args[0] == "gare") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET gare = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
    } else if(args[0] == "mairie") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET mairie = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })

    } else if(args[0] == "vocal") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(args[1] == "off") {
            await bot.db.query(`UPDATE gain SET vocal = '0' WHERE guildId = '${message.guild.id}'`)

            const finalEmbed = new Discord.EmbedBuilder()
            .setDescription(`:coin: Les gains pour l'activité "${args[0]}" ont été désactivé !`)
            .setColor(color)

            message.reply({ embeds: [finalEmbed] })
        } else {
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET vocal = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
        }
    } else if(args[0] == "stream") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(args[1] == "off") {
            await bot.db.query(`UPDATE gain SET stream = '0' WHERE guildId = '${message.guild.id}'`)

            const finalEmbed = new Discord.EmbedBuilder()
            .setDescription(`:coin: Les gains pour l'activité "${args[0]}" ont été désactivé !`)
            .setColor(color)

            message.reply({ embeds: [finalEmbed] })
        } else {
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET stream = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
        }
    } else if(args[0] == "cam") {
        if(!args[1]) return message.channel.send(`:x: Arguments invalides !`)
        if(args[1] == "off") {
            await bot.db.query(`UPDATE gain SET cam = '0' WHERE guildId = '${message.guild.id}'`)

            const finalEmbed = new Discord.EmbedBuilder()
            .setDescription(`:coin: Les gains pour l'activité "${args[0]}" ont été désactivé !`)
            .setColor(color)

            message.reply({ embeds: [finalEmbed] })
        } else {
        if(isNaN(args[1])) return message.reply(":x: Arguments invalides !")
        if(Number(args[1]) <= 0) return message.reply(":x: Arguments invalides !")

        await bot.db.query(`UPDATE gain SET cam = '${args[1]}' WHERE guildId = '${message.guild.id}'`)

        const finalEmbed = new Discord.EmbedBuilder()
        .setDescription(`:coin: Les gains pour l'activité "${args[0]}" a été modifié en ${args[1]}`)
        .setColor(color)

        message.reply({ embeds: [finalEmbed] })
        }
    } else {
        message.channel.send(`:x: Argument invalide !`)
    }

}