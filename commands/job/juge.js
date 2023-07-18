const Discord = require("discord.js")

const cooldownTime = 8 * 60 * 60;
const cooldownsbraquage = new Map();


exports.help = {
    name: "juge",
    category: "job",
    aliases: [],
    description: "lance un procès pour enlever le métier d'un joueur",
    usage: "juge <@user>"
}

exports.run = async (bot, message, args, color) => {
    let job = "aucun", voixpour = 0, voixcontre = 0; 
    bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const nohacker = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous devez être **juge** pour utiliser cette commande !`)
        .setColor(color)
        if(req[0].juge == "no") return message.channel.send({ embeds: [nohacker] })
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
     if(!mention) return message.channel.send(`:x: \`ERROR:\` Pas de membre trouvé !`)

        bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
            for (const columnName in req[0]) {
                if (columnName !== "cultivateur" && columnName !== "blanchisseur" && req[0][columnName] === "yes") {
                job = columnName;
                break;
                }
            }

            const nojob = new Discord.EmbedBuilder()
            .setDescription(`:x: **${mention.user.username}** n'a pas de métier !`)
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            if(job == "aucun") return message.channel.send({ embeds: [nojob] })

            const messagejugement = `:judge: **${message.author.username} lance un procès contre ${mention.user.username}** pour lui retirer son métier de \`${job}\`.\n\n> Si vous êtes favorable à ce procès pour lui retirer son métier cliquez sur :white_check_mark:\n\n> Si vous êtes contre ce procès et que vous ne souhaitez pas lui enlever son métier cliquez sur :x:\n\nLe parti gagnant est celui arrivant au nombre de vote requis en premier, vous ne pouvez voter qu'une fois et vous ne pouvez pas changer d'avis, réfléchissez bien !\n\n:white_check_mark: **Pour:** \`${voixpour} / 5 voix\`   |   :x: **Contre:** \`${voixcontre} / 3 voix\``

            const row = new Discord.ActionRowBuilder()
            .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('votepour')
                .setEmoji(`✅`)
                .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
                .setCustomId('votecontre')
                .setEmoji('❌')
                .setStyle(Discord.ButtonStyle.Primary)
                )

            const msg = await message.channel.send({ content: messagejugement, components: [row] })

             const collector = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button});

            collector.on('collect', (button) => {
                button.deferUpdate()

                if(button.customId) {
                bot.db.query(`SELECT * FROM juge WHERE guildId = "${message.guild.id}" AND userId = "${button.user.id}" AND messageId = "${msg.id}"`, async (err, req) => {
                    if(req.length < 1) { 
                if(button.customId == "votepour") {
                    bot.db.query(`INSERT INTO juge (guildId, messageId, userId) VALUES ("${message.guild.id}", "${msg.id}", "${button.user.id}")`)
                    voixpour = Number(voixpour) + 1
                    msg.edit({ content: `:judge: **${message.author.username} lance un procès contre ${mention.user.username}** pour lui retirer son métier de \`${job}\`.\n\n> Si vous êtes favorable à ce procès pour lui retirer son métier cliquez sur :white_check_mark:\n\n> Si vous êtes contre ce procès et que vous ne souhaitez pas lui enlever son métier cliquez sur :x:\n\nLe parti gagnant est celui arrivant au nombre de vote requis en premier, vous ne pouvez voter qu'une fois et vous ne pouvez pas changer d'avis, réfléchissez bien !\n\n:white_check_mark: **Pour:** \`${voixpour} / 5 voix\`   |   :x: **Contre:** \`${voixcontre} / 3 voix\`` })
                    if(voixpour == 5) {
                        const voixpourss = new Discord.EmbedBuilder()
                        .setDescription(`:scales: **Vous avez jugé** ${mention}, son rôle de ${job} lui a bien été retiré et il se retrouve désormais chômeur !\n\n**Voix pour:**\n\`5 / 5 voix\`\n\n**Voix contre:**\n\`${voixcontre} / 3\``)
                        .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1129463457184485516/3330157_original.gif?width=1000&height=562`)
                        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})

                        bot.db.query(`UPDATE job SET ${job} = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${mention.id}'`)

                        msg.edit({ content: `:x:`, components: []})
                        message.channel.send({ embeds: [voixpourss] })


                    }
                }
                if(button.customId == "votecontre") {
                    bot.db.query(`INSERT INTO juge (guildId, messageId, userId) VALUES ("${message.guild.id}", "${msg.id}", "${button.user.id}")`)
                    voixcontre = Number(voixcontre) + 1
                    msg.edit({ content: `:judge: **${message.author.username} lance un procès contre ${mention.user.username}** pour lui retirer son métier de \`${job}\`.\n\n> Si vous êtes favorable à ce procès pour lui retirer son métier cliquez sur :white_check_mark:\n\n> Si vous êtes contre ce procès et que vous ne souhaitez pas lui enlever son métier cliquez sur :x:\n\nLe parti gagnant est celui arrivant au nombre de vote requis en premier, vous ne pouvez voter qu'une fois et vous ne pouvez pas changer d'avis, réfléchissez bien !\n\n:white_check_mark: **Pour:** \`${voixpour} / 5 voix\`   |   :x: **Contre:** \`${voixcontre} / 3 voix\`` })
                    if(voixcontre == 3) {
                        msg.edit({ content: `:x:`, components: []})
                    }
                }
            } else {
                button.reply({ content: `Désolé, mais vous ne pouvez pas revoter !`, ephemeral: true})
            }
            })
            }
            })
    
        })
     
    })
}