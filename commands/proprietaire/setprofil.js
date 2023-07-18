const Discord = require("discord.js")

exports.help = {
    name: "setprofil",
    category: "administration",
    aliases: ["setprofile"],
    description: "Modifie avatar, pseudo ou encore activité du bot !",
    usage: "Pas d'utilisation conseillée",
    permission: "buyer"
}

exports.run = async (bot, message, args, color) => { 
    bot.db.query(`SELECT * FROM bot WHERE botId = "${bot.user.id}" `, async (err, req) => {

        let statut;        
        if(req == null) {
            statut = 'Aucun';
        } else {
            statut = req[0].statut
        }

        console.log(statut)
    const embed = new Discord.EmbedBuilder()
    .setTitle(`__Paramètres du profile du bot__`)
    .setDescription(`✏️・Changer le nom d'utilisateur\nActuel: ${bot.user.username}\n🎬・Changer l'avatar\nActuel: [Clique ici](${bot.user.avatarURL()})\n📱・Changer l'activitée\nActuel: ${statut}`)
    .setColor(color)
    .setFooter({ text: `${bot.user.id}` })
    .setTimestamp()

    const MenuSelection = new Discord.StringSelectMenuBuilder()
                .setCustomId('profilbotselect')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Faire une action")
                .addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Nom")
                        .setEmoji(`✏️`)
                        .setValue("namebot")
                        .setDescription(`Change le nom du bot`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Avatar")
                        .setEmoji(`🎬`)
                        .setValue("avatarbot")
                        .setDescription(`Change l'image de profil du bot`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Activité")
                        .setEmoji(`📱`)
                        .setValue("activitybot")
                        .setDescription(`Change l'activité et le type d'activité du bot`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Valider")
                        .setEmoji(`❌`)
                        .setValue("checkmenu")
                        .setDescription(`Ferme le menu`),
                )

    const msg = await message.reply({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents([MenuSelection])] })

    const collector = msg.createMessageComponentCollector({ components: Discord.ComponentType.StringSelect });

    collector.on('collect', async interaction => {
        interaction.deferUpdate()
        
        if(interaction.customId == 'profilbotselect') {
            if(interaction.user.id !== message.author.id) return interaction.reply({ content: 'Vous n\'avez pas la permission !', ephemeral: true });

            if(interaction.values[0] == 'namebot') {
                interaction.channel.send(':question: Quel nom voulez-vous donner au bot:').catch(_ => { });
                let filter2 = (m) => m.author.id == interaction.user.id;
                await interaction.channel.awaitMessages({ 
                    filter: filter2,
                    max: 1
                }).then(async (collected) => {
                    const username = collected.first().content;
                    bot.user.setUsername(username).catch(err => {
                        return collected.first().reply(('Je ne peux pas changer le nom du bot !'))
                    })
                    setTimeout(async() => {
                        return collected.first().reply(`Le nom du bot a été changé en \`${username}\`.`);
                    }, 1500)
                })       
            }

            if(interaction.values[0] == 'avatarbot') {
                interaction.channel.send(':question: Quel avatar voulez-vous donner au bot:').catch(_ => { });
                let filter2 = (m) => m.author.id == interaction.user.id;
                await interaction.channel.awaitMessages({ 
                    filter: filter2,
                    max: 1
                }).then(async (collected) => {
                    const avatar = collected.first().content;
                    bot.user.setAvatar(avatar).catch(err => {
                        return collected.first().reply('Je ne peux pas changer l\'avatar du bot !').catch(err => {
                            return interaction.channel.send('Je ne peux pas changer l\'avatar du bot !')
                        });
                    })
                    setTimeout(async() => {
                        collected.first().reply('L\'avatar du bot a été changé.').catch(err => {
                            interaction.channel.send('L\'avatar du bot a été changé.');
                        });
                    }, 1500)
                }) 
            }

            if(interaction.values[0] == 'activitybot') {
                interaction.channel.send(':question: Quel statut voulez-vous donner au bot:').catch(_ => { });
                let filter2 = (m) => m.author.id == interaction.user.id;
                await interaction.channel.awaitMessages({ 
                    filter: filter2,
                    max: 1
                }).then(async (collected) => {
                    const statut = collected.first().content;
                    bot.db.query(`UPDATE bot SET statut = '${statut}' WHERE botId = ${bot.user.id}`);
                    interaction.channel.send(`Le nouveau statut du bot est: \`${statut}\`.`);
                    setTimeout(async() => {
                        interaction.channel.send(':question: Quel type voulez-vous donner au bot exemple: \`jouer, regarder, écouter, stream\`').catch(_ => { });
                        let filter2 = (m) => m.author.id == interaction.user.id;
                        await interaction.channel.awaitMessages({ 
                            filter: filter2,
                            max: 1
                        }).then(async (collected) => {
                            let type;
                            if(collected.first().content.toLowerCase() == 'jouer') type = 'Playing';
                            if(collected.first().content.toLowerCase() == 'regarder') type = 'Watching';
                            if(collected.first().content.toLowerCase() == 'écouter') type = 'Listening';
                            if(collected.first().content.toLowerCase() == 'stream') type = 'Streaming';
                            if(type == 'Playing') {
                                bot.db.query(`UPDATE bot SET type = '${type}' WHERE botId = ${bot.user.id}`);
                                return interaction.channel.send(`Le nouveau type du bot est: \`${type}\`.`)
                            }
                            if(type == 'Watching') {
                                bot.db.query(`UPDATE bot SET type = '${type}' WHERE botId = ${bot.user.id}`);
                                return interaction.channel.send(`Le nouveau type du bot est: \`${type}\`.`)
                            }
                            if(type == 'Listening') {
                                bot.db.query(`UPDATE bot SET type = '${type}' WHERE botId = ${bot.user.id}`);
                                return interaction.channel.send(`Le nouveau type du bot est: \`${type}\`.`)
                            }
                            if(type == 'Streaming') {
                                bot.db.query(`UPDATE bot SET type = '${type}' WHERE botId = ${bot.user.id}`);
                                return interaction.channel.send(`Le nouveau type du bot est: \`${type}\`.`)
                            }
                        }) 
                    })
                })
            }
        }
    })
    })

}