const Discord = require("discord.js")

exports.help = {
    name: "tedit",
    category: "team",
    aliases: ["t-edit"],
    description: "Modifie les informations de la team",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
  let avatardescription = "", bannerdescription = null, avatarURL = null, bannerURL = null;

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
    const team = req[0].team
    if(team == "no") return message.reply(`:x: Cette team n'existe pas !`)
    bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${team}"`, async (err, req) => {
    const owner = req[0].ownerId
    if(owner !== message.author.id) return message.channel.send(`:warning: Vous devez être Leader de la team pour la modifier !`)
    let title = req[0].nom
    let description = req[0].description;
    const teamname = req[0].nom

    let menuoptions = new Discord.StringSelectMenuBuilder()
        .setCustomId('MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Faire une action")
        .addOptions(
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Modifier le nom`)
            .setDescription(`Permet de changer le nom de la team`)
            .setEmoji(`✏️`)
            .setValue(`nameteam`),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Modifier la description`)
            .setDescription(`Permet de changer la description de la team`)
            .setEmoji(`📃`)
            .setValue(`descriptionteam`),
        )

        if(req[0].avatar !== "no") {
          if(req[0].avatar == "yes") {
            avatarURL = null
          } else {
            avatarURL = req[0].avatar
          }
          
          menuoptions.addOptions(
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Modifier le logo`)
            .setDescription(`Permet de changer le logo de la team`)
            .setEmoji(`👥`)
            .setValue(`logoteam`),
          )
          bannerdescription = bannerURL
        }

        if(req[0].banner !== "no") {
          if(req[0].banner == "yes") {
            bannerURL = null
          } else {
            bannerURL = req[0].banner
          }
          
          menuoptions.addOptions(
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Modifier la bannière`)
            .setDescription(`Permet de changer la bannière de la team`)
            .setEmoji(`🌄`)
            .setValue(`bannerteam`),
          )
        }

         const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `🗽 Panel de modification de la team ${title}` })
    .setDescription(`✏️ Nom: ${title}\n📃 Description: ${description}\n${avatardescription}`)
    .setImage(bannerURL)
    .setFooter({ text: `Team ID: ${team}` })
    .setThumbnail(avatarURL)
    .setColor(color)

        const menumsg = await message.reply({ embeds: [embed], content: `Chargement...`, components: [new Discord.ActionRowBuilder().addComponents([menuoptions])] })

        let filter2 = (m) => m.author.id === message.author.id

        const col = await menumsg.createMessageComponentCollector({
        })

        col.on("collect", async (i) => {
            await i.deferUpdate()

            if (i.values[0] == "nameteam") {
                if(i.user.id !== message.author.id) return i.reply({content: `Vous n'avez pas la permission !`, ephemeral: true })

                const msg = await message.channel.send(`✏️ Veuillez entrer le **nom** de la team:\n(_Tapez \`cancel\` pour annuler l'action en cours_)`)

                    let collected = await message.channel.awaitMessages({
                      filter: filter2,
                      max: 1,
                      time: 60000,
                    }).then(async (collected) => {
                      const msg = collected.first().content;
                      if(msg == "cancel") return message.channel.send(`:x: Action annulée`)

                      if(msg.length > 25) return message.channel.send(`:x: Le nom peut contenir 25 caractères maximum: action annulée`)
                      title = collected.first().content;



                      
                      bot.db.query(`UPDATE team SET nom = '${msg}' WHERE guildId = '${message.guild.id}' AND id = '${team}'`)
                      message.channel.send(`✏️ Le nom de la team a bien été modifié !`)

                          const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: `🗽 Panel de modification de la team ${title}}` })
                            .setDescription(`✏️ Nom: ${title}\n📃 Description: ${description}\n${avatardescription}`)
                            .setFooter({ text: `Team ID: ${team}` })
                            .setColor(color)
                            .setImage(bannerURL)
                            .setThumbnail(avatarURL)
                      menumsg.edit({ embeds: [embed] })

                    })
            }

            if (i.values[0] == "logoteam") {
                if(i.user.id !== message.author.id) return i.reply({content: `Vous n'avez pas la permission !`, ephemeral: true })

                const msg = await message.channel.send(`👥 Veuillez envoyer le **logo** de la team:\n(_Tapez \`cancel\` pour annuler l'action en cours_)`)

                    let collected = await message.channel.awaitMessages({
                      filter: filter2,
                      max: 1,
                      time: 60000,
                    }).then(async (collected) => {
                      const msg = collected.first();
                      if(msg == "cancel") return message.channel.send(`:x: Action annulée`)

                      if (msg.attachments.first()) {
                        const attachment = msg.attachments.first();
                        const avatarURL = attachment.url
                        avatardescription = `👥 Logo: [Logo URL](${avatarURL})`
                        bot.db.query(`UPDATE team SET avatar = '${avatarURL}' WHERE guildId = '${message.guild.id}' AND id = '${team}'`)
                        message.channel.send(`👥 L'avatar de la team a bien été modifié !`);
                        const embed = new Discord.EmbedBuilder()
                          .setAuthor({ name: `🗽 Panel de modification de la team ${title}` })
                          .setDescription(`✏️ Nom: ${title}\n📃 Description: ${description}\n${avatardescription}`)
                          .setFooter({ text: `Team ID: ${team}`})
                          .setColor(color)
                          .setImage(bannerURL)
                          .setThumbnail(avatarURL);
                        menumsg.edit({ embeds: [embed] });
                      } else {
                        const imageUrl = collected.first().content;
                            if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
                              avatardescription = `👥 Logo: [Logo URL](${imageUrl})`
                                bot.db.query(`UPDATE team SET avatar = '${imageUrl}' WHERE guildId = '${message.guild.id}' AND id = '${team}'`)
                                message.channel.send(`👥 L'avatar de la team a bien été modifié !`);
                                const embed = new Discord.EmbedBuilder()
                                  .setAuthor({ name: `🗽 Panel de modification de la team ${title}` })
                                  .setDescription(`✏️ Nom: ${title}\n📃 Description: ${description}\n${avatardescription}`)
                                  .setFooter({ text: `Team ID: ${team}`})
                                  .setColor(color)
                                  .setImage(bannerURL)
                                  .setThumbnail(imageUrl);
                                menumsg.edit({ embeds: [embed] });
                            } else {
                              return message.reply(`:x: Image invalide`);
                            }
                      }
                    })
            }

            if (i.values[0] == "bannerteam") {
                if(i.user.id !== message.author.id) return i.reply({content: `Vous n'avez pas la permission !`, ephemeral: true })

                const msg = await message.channel.send(`🌄 Veuillez envoyer la **bannière** de la team:\n(_Tapez \`cancel\` pour annuler l'action en cours_)`)

                    let collected = await message.channel.awaitMessages({
                      filter: filter2,
                      max: 1,
                      time: 60000,
                    }).then(async (collected) => {
                      const msg = collected.first();
                      if(msg == "cancel") return message.channel.send(`:x: Action annulée`)

                      if (msg.attachments.first()) {
                        const attachment = msg.attachments.first();
                        const bannerURL = attachment.url
                        bot.db.query(`UPDATE team SET banner = '${bannerURL}' WHERE guildId = '${message.guild.id}' AND id = '${team}'`)
                        message.channel.send(`🌄 La bannière de la team a bien été modifié !`);
                        const embed = new Discord.EmbedBuilder()
                          .setAuthor({ name: `🗽 Panel de modification de la team ${title}` })
                          .setDescription(`✏️ Nom: ${title}\n📃 Description: ${description}\n${avatardescription}`)
                          .setFooter({ text: `Team ID: ${team}`})
                          .setColor(color)
                          .setImage(bannerURL)
                          .setThumbnail(avatarURL);
                        menumsg.edit({ embeds: [embed] });
                      } else {
                        const imageUrl = collected.first().content;
                            if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
                                bot.db.query(`UPDATE team SET banner = '${imageUrl}' WHERE guildId = '${message.guild.id}' AND id = '${team}'`)
                                message.channel.send(`🌄 La bannière de la team a bien été modifié !`);
                                const embed = new Discord.EmbedBuilder()
                                  .setAuthor({ name: `🗽 Panel de modification de la team ${title}` })
                                  .setDescription(`✏️ Nom: ${title}\n📃 Description: ${description}\n${avatardescription}`)
                                  .setFooter({ text: `Team ID: ${team}`})
                                  .setColor(color)
                                  .setImage(imageUrl)
                                  .setThumbnail(avatarURL);
                                menumsg.edit({ embeds: [embed] });
                            } else {
                              return message.reply(`:x: Image invalide`);
                            }
                      }
                    })
            }

            if (i.values[0] == "descriptionteam") {
                if(i.user.id !== message.author.id) return i.reply({content: `Vous n'avez pas la permission !`, ephemeral: true })

                const msg = await message.channel.send(`📃 Veuillez entrer la **description** de la team:\n(_Tapez \`cancel\` pour annuler l'action en cours_)`)

                    let collected = await message.channel.awaitMessages({
                      filter: filter2,
                      max: 1,
                      time: 60000,
                    }).then(async (collected) => {
                      const msg = collected.first().content;
                      if(msg == "cancel") return message.channel.send(`:x: Action annulée`)

                      if(msg.length > 100) return message.channel.send(`:x: La description peut contenir 100 caractères maximum: action annulée`)
                       description = collected.first().content;



                      
                      bot.db.query(`UPDATE team SET description = '${msg}' WHERE guildId = '${message.guild.id}' AND id = '${team}'`)
                      message.channel.send(`✏️ La description de la team a bien été modifié !`)

                          const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: `🗽 Panel de modification de la ${title}` })
                            .setDescription(`✏️ Nom: ${title}\n📃 Description: ${description}\n${avatardescription}`)
                            .setFooter({ text: `Team ID: ${team}` })
                            .setColor(color)
                            .setImage(bannerURL)
                            .setThumbnail(avatarURL)
                      menumsg.edit({ embeds: [embed] })

                    })
            }
        
        })


    })

    })

}