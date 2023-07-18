const Discord = require("discord.js")

exports.help = {
    name: "tpromote",
    category: "team",
    aliases: ["trankup"],
    description: "Augmente le grade d'un membre dans la team",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const teamid = req[0].team
        if(teamid == 'no') return message.reply(`:x: Vous n'appartenez à aucune team !`)
        bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(req[0].grade == "Membres" || req[0].grade == "Officier") return message.channel.send(`:x: Vous devez être le leader de votre team pour rankup un membre !`)
            const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!mention) return message.channel.send(`:x: \`ERROR:\` Pas de membre trouvé !`)
            if(mention.id == message.author.id) return message.reply(":x: Vous ne pouvez pas vous rankup vous-mêmes !")
            bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
                if(req.length < 1) return message.reply(`:x: ${mention.user.username} ne fait pas parti de votre team !`)
                const grade = req[0].grade
                bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {

            if(grade == "Membres") {
                bot.db.query(`UPDATE tmembers SET grade = "Officier" WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`); 
                message.reply(`:bookmark_tabs: ${mention} est désormais **Officier de la team ${req[0].nom}** !`)
            } else if(grade == "Officier") {
                const bottoncounter = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setEmoji("✅")
                    .setCustomId("yestoupintocrown")
                    .setLabel(`Oui je le veux`)
                    .setStyle(Discord.ButtonStyle.Primary),
                )
                const msg = await message.reply({ content: `:question: Êtes-vous sûr de vouloir donner la propriété de la team à ${mention} ?`, components: [bottoncounter]})

                    const collector = msg.createMessageComponentCollector({
                        time: 60000,
                    });

                    collector.on('collect', async (interaction) => {
                        interaction.deferUpdate()

                    if (interaction.customId === 'yestoupintocrown') {
                        if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true })

                        const buttons = bottoncounter.components;
                        buttons[0].setDisabled(true);
                        bot.db.query(`UPDATE tmembers SET grade = "Officier" WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`); 
                        bot.db.query(`UPDATE tmembers SET grade = "Créateur" WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`); 

                        interaction.channel.send(`:beginner: ${mention} est désormais **créateur de la team ${req[0].nom}** !`)

                    }
                
            })
            }
        })
            })
        })
    })
}