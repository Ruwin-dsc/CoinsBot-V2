const Discord = require("discord.js")

exports.help = {
    name: "tinvite",
    category: "team",
    aliases: ["t-invite"],
    description: "Invite un membre dans votre team",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const teamid = req[0].team
        if(teamid == 'no') return message.reply(`:x: Vous n'appartenez à aucune team !`)
        bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
            if(req[0].grade == "Membres") return message.channel.send(`:warning: Vous devez être Officier ou Leader de la team pour inviter !`)
            const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!mention) return message.channel.send(`:x: \`ERROR:\` Pas de membre trouvé !`)
            if(mention.id === message.author.id) return message.channel.send(`:x: Vous ne pouvez pas vous inviter vous-mêmes !`)

            bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
                if(req.length >= 1) {
                    return message.channel.send(`:x: ${mention.user.username} appartient déjà à une team !`)
                } else {
                    bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
                    
                    const inviteEmbed = new Discord.EmbedBuilder()
                    .setDescription(`:question: ${mention} acceptes-tu l'invitation dans la team **${req[0].nom}** ?\n*Tu as 30 secondes pour accepter*`)
                    .setColor(color)
                    .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1128980613223956522/unknown.png?width=1638&height=1638`)

                    const MenuSelection = new Discord.StringSelectMenuBuilder()
                    .setCustomId('MenuSelectionCounter')
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("Faire une action")
                    .addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Accepter")
                        .setValue("acceptinviteteam")
                        .setDescription(`Permet d'accepter l'invitation`),
                    )

                    const msg = await message.reply({ embeds: [inviteEmbed], components: [new Discord.ActionRowBuilder().addComponents([MenuSelection])]})

                    const collector = msg.createMessageComponentCollector({
                        time: 30000,
                    });
                    collector.on('collect', async (interaction) => {
                        interaction.deferUpdate()
                        if (interaction.values[0] === 'acceptinviteteam') {
                            if(interaction.user.id !== mention.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
                            bot.db.query(`UPDATE user SET team = '${teamid}' WHERE guildId = '${message.guild.id}'`)
                            bot.db.query(`INSERT INTO tmembers (guildId, teamId, userId, grade) VALUES ("${message.guild.id}", "${teamid}", "${mention.id}", "Membres")`)
                            interaction.reply(`# Bienvenue à toi, ${mention.user.username} dans ${req[0].nom}`)
                            msg.delete()
                        }
                        })
                    })
                }

            })
        })        
    })
}