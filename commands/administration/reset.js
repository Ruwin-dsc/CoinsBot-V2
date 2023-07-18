const Discord = require("discord.js")

exports.help = {
    name: "reset",
    category: "administration",
    aliases: [],
    description: "Reset le serveur où un utilisateur (user / server)",
    usage: "Pas d'utilisation conseillée",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {
    let filter2 = (m) => m.author.id === message.author.id

    if(args[0] == "all") {
        const msg = await message.channel.send(`:warning: Êtes-vous sûr de vouloir reset l'économie du serveur ?\nLes paramètres actuels seront supprimés.\nRépondez "oui" à ce message pour poursuivre le reset !`)

        let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected) => {
                        var mess = collected.first().content;
                        if(mess.toLowerCase() !== "oui") return message.reply(`:x: Action annulé !`)

                        message.reply(`♻️ Reset en cours...`)
                        bot.db.query(`DELETE FROM user WHERE guildId = ${message.guild.id}`)
                        bot.db.query(`DELETE FROM mine WHERE guildId = ${message.guild.id}`)
                        bot.db.query(`DELETE FROM team WHERE guildId = ${message.guild.id}`)
                        bot.db.query(`DELETE FROM gain WHERE guildId = ${message.guild.id}`)
                        bot.db.query(`DELETE FROM batiment WHERE guildId = ${message.guild.id}`)
                        bot.db.query(`DELETE FROM tmembers WHERE guildId = ${message.guild.id}`)
                        bot.db.query(`DELETE FROM juge WHERE guildId = ${message.guild.id}`)
                        bot.db.query(`DELETE FROM job WHERE guildId = ${message.guild.id}`)
                        bot.db.query(`DELETE FROM xp WHERE guildId = ${message.guild.id}`)
                        await message.channel.send(`L'économie du serveur a été reset !`)
                    })
    } else if (args[0] == "user") {
        const msg = await message.channel.send(`:eyes: Mentionnez un utilisateur à reset:`)

        let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected) => {
                        
                        const user = collected.first().mentions.members.first() || message.guild.members.cache.get(collected.first().content)
                        if(!user) return message.reply(`:x: Utilisateur non trouvé !`)

                        let collected2 = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected) => {
                        await message.channel.send(`:warning: Êtes-vous sûr de vouloir reset ${user} ?\nRépondez "oui" à ce message pour poursuivre le reset !`)
                        var mess = collected.first().content;
                        if(mess.toLowerCase() !== "oui") return message.reply(`:x: Action annulé !`)

                        message.reply(`♻️ Reset en cours...`)
                        bot.db.query(`DELETE FROM user WHERE guildId = ${message.guild.id} AND userId = ${user.id}`)
                        bot.db.query(`DELETE FROM mine WHERE guildId = ${message.guild.id} AND userId = ${user.id}`)
                        bot.db.query(`DELETE FROM batiment WHERE guildId = ${message.guild.id} AND userId = ${user.id}`)
                        bot.db.query(`DELETE FROM tmembers WHERE guildId = ${message.guild.id} AND userId = ${user.id}`)
                        bot.db.query(`DELETE FROM juge WHERE guildId = ${message.guild.id} AND userId = ${user.id}`)
                        bot.db.query(`DELETE FROM job WHERE guildId = ${message.guild.id} AND userId = ${user.id}`)
                        await message.channel.send(`${user} a été reset !`)
                    })
                    })
    } else {
        
    }

}