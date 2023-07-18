const Discord = require("discord.js")

exports.help = {
    name: "job",
    category: "job",
    aliases: ["métier"],
    description: "Permets d'acheter un métier",
    usage: "job <métier>"
}

exports.run = async (bot, message, args, color) => {
    const noargs = new Discord.EmbedBuilder()
    .setDescription(`:x: Entrez un métier à acheter !\nPour plus d'informations utilisez la commande \`job info\``)
    .setColor(color)
    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    if(!args[0]) return message.reply({ embeds: [noargs] })

    if(args[0] === "info") {
        const infoEmbed = new Discord.EmbedBuilder()
        .setTitle(`Voici la boutique du serveur ${message.guild.name}`)
        .setDescription(`**braqueur**\nPrix: 16 rep\nAvantage: Accès à la commande \`braquage\` qui permet de braquer les coins en banque d'une autre personne ou d'une team\n\n**tueur**\nPrix: 14 rep\nAvantage: Accès à la commande \`kill\` qui permet de voler des points de réputation à un autre utilisateur\n\n**juge**\nPrix: 15 rep\nAvantage: Accès à la commande \`juge\` qui permet de lancer un jugement pour retirer le métier d'un autre joueur\n\n**cambrioleur**\nPrix: 12 rep\nAvantage: Accès à la commande \`cambriolage\` qui permet de voler des coins dans l'entrepot d'un autre utilisateur\n\n**hacker**\nPrix: 13 rep\nAvantage: Accès à la commande \`hack\` qui permet de détruire un cadena d'une team\n\n**policier**\nPrix: 13 rep\nAvantage: Accàs à la commande \`arrest\` qui permet d'arrêter un joueur et de vérifier s'il n'a pas de :pill:, le policier retire les :pill: du joueurs et l'empêche de jouer pendant 20 minutes !\n\n(capacité) **blanchisseur**\nPrix: 15 rep\nAvantage: Le blanchisseur peut convertir les :pill: en coins\n\n(capacité) **cultivateur**\nPrix: 8 rep\nAvantage: Le cultivateur à accès à la commande \`recolt\``)
        .setColor(color)
        .setFooter({ text: `Le prix des jobs est en reputation | utilisez job <métier>`})

        message.channel.send({ embeds: [infoEmbed] })

    } else if (args[0].toLowerCase() == "cultivateur") {
            message.reply(`Utilisez la commande \`mobil\` pour avoir la capacité cultivateur !\nDe plus cultivateur est une capacité et non un métier, vous ne pouvez avoir qu'une capacité et qu'un métier !`)
    } else if (args[0].toLowerCase() == "blanchisseur") {
            message.reply(`Utilisez la commande \`mobil\` pour avoir la capacité blanchisseur !\nDe plus blanchisseur est une capacité et non un métier, vous ne pouvez avoir qu'une capacité et qu'un métier !`)
    } else if (args[0].toLowerCase() == "policier") {
            bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 13 réputations pour devenir un **policier**`)
            .setColor(color)
            if(Number(reputation) < 13) return message.channel.send({ embeds: [norep]})

            bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                const job = req[0].policier 
                if(job == "yes") return message.reply(`:x: Vous êtes déjà un **policier**`)

            newrep = Number(reputation) - 13

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous êtes devenu **policier** pour \`13 rep\`\nAvantage: Accès à la commande arrest qui permet d'arrêter un joueur et de vérifier s'il n'a pas de :pill:, le policier retire les :pill: du joueur et l'empêche de jouer pendant 20 minutes !`)
            .setColor(color)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE job SET policier = 'yes', hacker = 'no', cambrioleur = 'no', juge = 'no', tueur = 'no', braqueur = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
             })
        })
    } else if (args[0].toLowerCase() == "hacker") {
            bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 13 réputations pour devenir un **hacker**`)
            .setColor(color)
            if(Number(reputation) < 13) return message.channel.send({ embeds: [norep]})

            bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                const job = req[0].hacker 
                if(job == "yes") return message.reply(`:x: Vous êtes déjà un **hacker**`)

            newrep = Number(reputation) - 13

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous êtes devenu **hacker** pour \`13 rep\``)
            .setColor(color)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE job SET policier = 'no', hacker = 'yes', cambrioleur = 'no', juge = 'no', tueur = 'no', braqueur = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
             })
        })
    } else if (args[0].toLowerCase() == "cambrioleur") {
            bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 12 réputations pour devenir un **cambrioleur**`)
            .setColor(color)
            if(Number(reputation) < 12) return message.channel.send({ embeds: [norep]})

            bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                const job = req[0].cambrioleur 
                if(job == "yes") return message.reply(`:x: Vous êtes déjà un **cambrioleur**`)

            newrep = Number(reputation) - 12

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous êtes devenu **cambrioleur** pour \`12 rep\`\nAvantage: Accès à la commande \`cambriolage\` qui permet de voler des coins dans l'entrepôt d'un autre utilisateur`)
            .setColor(color)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE job SET policier = 'no', hacker = 'no', cambrioleur = 'yes', juge = 'no', tueur = 'no', braqueur = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
             })
        })
    } else if (args[0].toLowerCase() == "juge") {
            bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 15 réputations pour devenir un **juge**\nAvantage: Accès à la commande \`juge\` qui permet de lancer un jugement pour retirer le métier d'un autre joueur`)
            .setColor(color)
            if(Number(reputation) < 15) return message.channel.send({ embeds: [norep]})

            bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                const job = req[0].juge 
                if(job == "yes") return message.reply(`:x: Vous êtes déjà un **juge**`)

            newrep = Number(reputation) - 15

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous êtes devenu **juge** pour \`15 rep\`\nAvantage: Accès à la commande \`juge\` qui permet de lancer un jugement pour retirer le métier d'un autre joueur`)
            .setColor(color)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE job SET policier = 'no', hacker = 'no', cambrioleur = 'no', juge = 'yes', tueur = 'no', braqueur = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
             })
        })
    } else if (args[0].toLowerCase() == "tueur") {
            bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 14 réputations pour devenir un **tueur**`)
            .setColor(color)
            if(Number(reputation) < 14) return message.channel.send({ embeds: [norep]})

            bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                const job = req[0].tueur 
                if(job == "yes") return message.reply(`:x: Vous êtes déjà un **tueur**`)

            newrep = Number(reputation) - 14

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous êtes devenu **tueur** pour \`14 rep\`\nAvantage: Accès à la commande \`kill\` qui permet de voler des points de réputation à un autre utilisateur`)
            .setColor(color)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE job SET policier = 'no', hacker = 'no', cambrioleur = 'no', juge = 'no', tueur = 'yes', braqueur = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
             })
        })
    } else if (args[0].toLowerCase() == "braqueur") {
            bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            const reputation = req[0].reputation;
            const norep = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez besoin de 16 réputations pour devenir un **braqueur**`)
            .setColor(color)
            if(Number(reputation) < 16) return message.channel.send({ embeds: [norep]})

            bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                const job = req[0].braqueur 
                if(job == "yes") return message.reply(`:x: Vous êtes déjà un **braqueur**`)

            newrep = Number(reputation) - 16

            const rep = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous êtes devenu **braqueur** pour \`16 rep\`\nAvantage: Accès à la commande \`braquage\` qui permet de braquer les coins en banque d'une autre personne ou d'une team`)
            .setColor(color)

            bot.db.query(`UPDATE user SET reputation = '${newrep}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE job SET policier = 'no', hacker = 'no', cambrioleur = 'no', juge = 'no', tueur = 'no', braqueur = 'yes' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            message.channel.send({ embeds: [rep] })
             })
        })
    }

}