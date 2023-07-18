const Discord = require("discord.js")

exports.help = {
    name: "embed",
    category: "récompenses",
    aliases: ["color"],
    description: "Change la couleur de vos embed",
    usage: "embed <bleu/rouge/jaune/vert/invisible>"
}

exports.run = async (bot, message, args, color) => {
    let colorEmbed, newrep;

    const noargs = new Discord.EmbedBuilder()
    .setDescription(`:x: Entrez la couleur de l'embed désirée !\nPour plus d'informations utilisez la commande embed info`)
    .setFooter({text: `Les récompenses sont attribuées toute les 4 heures`})
    .setColor(color)

    const info = new Discord.EmbedBuilder()
    .setTitle(`Voici la boutique du serveur ${message.guild.name}`)
    .setDescription(`\`Bleu\`\nPrix: 3 rep\n\`Rouge\`\nPrix: 3 rep\n\`Jaune\`\nPrix: 3 rep\n\`Vert\`\nPrix: 3 rep\n\`Invisible\`\nPrix: 4 rep\n\`Blanc\`\nPrix: 3 rep\n\`Noir\`\nPrix: 3 rep\n\`Random\`\nPrix: 5 rep`)
    .setFooter({text: `Les récompenses sont attribuées toute les 4 heures`})
    .setColor(color)

    if(!args[0]) return message.reply({ embeds: [noargs]})
    if(args[0] == "info") return message.reply({ embeds: [info]})

    if(args[0].toLowerCase() == "bleu" || args[0].toLowerCase() == "rouge" || args[0].toLowerCase() == "vert" || args[0].toLowerCase() == "jaune" || args[0].toLowerCase() == "blanc" || args[0].toLowerCase() == "noir") {
        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 3 rep pour acheter la couleur **${args[0]}**`)
            .setColor(color)
            if(Number(reputation) < 3) return message.channel.send({ embeds: [norep]})

            if(args[0] == "rouge") colorEmbed = "Red"
            if(args[0] == "vert") colorEmbed = "Green"
            if(args[0] == "jaune") colorEmbed = "Yellow"
            if(args[0] == "blanc") colorEmbed = "White"
            if(args[0] == "noir") colorEmbed = "Black"

            newrep = Number(reputation) - 3

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: La couleur de vos embed sera désormais **${args[0]}**\n3 rep vous ont été prélevés !`)
            .setColor(colorEmbed)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE user SET color = '${colorEmbed}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
        })

    } else if (args[0].toLowerCase() == "invisible") {
        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 4 rep pour acheter la couleur **${args[0]}**`)
            .setColor(color)
            if(Number(reputation) < 4) return message.channel.send({ embeds: [norep]})

            colorEmbed = "Default"

            newrep = Number(reputation) - 4

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: La couleur de vos embed sera désormais **${args[0]}**\n4 rep vous ont été prélevés !`)
            .setColor(colorEmbed)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE user SET color = '${colorEmbed}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
        })
    } else if (args[0].toLowerCase() == "random") {
        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 5 rep pour acheter la couleur **${args[0]}**`)
            .setColor(color)
            if(Number(reputation) < 5) return message.channel.send({ embeds: [norep]})

            colorEmbed = "Random"

            newrep = Number(reputation) - 5

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: La couleur de vos embed sera désormais **${args[0]}**\n5 rep vous ont été prélevés !`)
            .setColor(colorEmbed)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE user SET color = '${colorEmbed}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
        })
    } else {
        return message.reply({ embeds: [noargs]})
    }

}