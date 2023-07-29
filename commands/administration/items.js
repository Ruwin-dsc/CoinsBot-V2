const Discord = require("discord.js")

exports.help = {
    name: "items",
    category: "administration",
    aliases: ["add-items"],
    description: "Modifie le shop du serveur",
    usage: "Pas d'utilisation conseillée",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {
    let items = "", counter = 1;
    bot.db.query(`SELECT * FROM items WHERE guildId = ${message.guild.id}`, async (err, req) => {
        if(req.length < 1) {
            items = "Aucun item n'a été ajouté dans le shop du serveur !"
        } else {
            req.forEach((row) => {
                const name = row.name;
                const role = row.roleId;
                const prix = row.prix
                items += `${counter}) ${name} (<@&${role}>)\nPrix: \`${prix} coins\`\n`;
                counter = Number(counter) + 1
              });
        }

        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Panel de configuration du shop de ${message.guild.name}` })
        .setDescription(items)
        .addFields({ name: `➕`, value: `Ajouter un rôle au shop`, inline: true })
        .addFields({ name: `➖`, value: `Retire un rôle du shop`, inline: true})
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
        .setColor(color)

        let menuoptions = new Discord.StringSelectMenuBuilder()
        .setCustomId('MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Faire une action")
        .addOptions(
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Ajouter`)
            .setEmoji(`➕`)
            .setValue(`additems`),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Retirer`)
            .setEmoji(`➖`)
            .setValue(`removeitems`),
        )
        items = ""
        counter = 1
        const msg = await message.channel.send({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents([menuoptions])] })


        const col = await msg.createMessageComponentCollector({})

        col.on("collect", async (i) => {
            let filter2 = (m) => m.author.id == i.user.id;
            if(i.user.id !== message.author.id) return i.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true})
            await i.deferUpdate()

            if (i.values[0] == "removeitems") {
                const msg1 = await i.channel.send(`:eyes: Veuillez entrer le **nom** de l'item à supprimer:`)
                await i.channel.awaitMessages({ 
                    filter: filter2,
                    max: 1
                }).then(async (collected) => {
                   const msg2 = collected.first()

                   msg2.delete()
                   msg1.delete()

                   bot.db.query(`SELECT * FROM items WHERE guildId = "${message.guild.id}" AND name = "${msg2.content}"`, async (err, req) => {
                    if(req.length < 1) {
                        return message.reply(`\`❌\` Le nom de l'item à supprimer que vous avez indiqué n'existe pas !`)
                    } else {
                    bot.db.query(`DELETE FROM items WHERE guildId = "${message.guild.id}" AND name = "${msg2.content}"`)

                    bot.db.query(`SELECT * FROM items WHERE guildId = ${message.guild.id}`, async (err, req) => {
                        if(req.length < 1) {
                            items = "Aucun item n'a été ajouté dans le shop du serveur !"
                        } else {
                            req.forEach((row) => {
                                const name = row.name;
                                const role = row.roleId;
                                const prix = row.prix
                                items += `${counter}) ${name} (<@&${role}>)\nPrix: \`${prix} coins\`\n`;
                                counter = Number(counter) + 1
                              });
                        }
                
                        const embed3 = new Discord.EmbedBuilder()
                        .setAuthor({ name: `Panel de configuration du shop de ${message.guild.name}` })
                        .setDescription(items)
                        .addFields({ name: `➕`, value: `Ajouter un rôle au shop`, inline: true })
                        .addFields({ name: `➖`, value: `Retire un rôle du shop`, inline: true})
                        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
                        .setColor(color)

                    items = ""
                    counter = 1
                    msg.edit({ embeds: [embed3] })

                    message.channel.send({ content: `Item supprimé avec succès !` })

                })
                    }
                   })
                })

            }
            if (i.values[0] == "additems") {
                if(req.length == 22) return i.reply(`\`❌\` Le nombre d'items est limité à 22 !`)
                const msg1 = await i.channel.send(`:eyes: Veuillez entrer le **nom** de l'item:`)
                await i.channel.awaitMessages({ 
                    filter: filter2,
                    max: 1
                }).then(async (collected) => {
                   const msg2 = collected.first()
                   const msg3 = await i.channel.send(`:eyes: Veuillez entrer le **prix** de l'item (minimum 10 coins):`)
                        await i.channel.awaitMessages({ 
                            filter: filter2,
                            max: 1
                        }).then(async (collected) => {
                            const msg4 = collected.first()
                            if(isNaN(msg4.content) || Number(msg4.content) < 10) {
                                message.reply(`\`❌\` Ceci n'est pas un nombre valide !`)
                                msg4.delete()
                                msg3.delete()
                                msg2.delete()
                                return msg1.delete()
                            }
                            const msg5 = await i.channel.send(`:eyes: Veuillez mentionner ou entrer l'ID du **rôle** donné avec l'item:`)
                            await i.channel.awaitMessages({ 
                                filter: filter2,
                                max: 1
                            }).then(async (collected) => {
                                const msg6 = collected.first()
                                const roles = msg6.mentions.roles.first() || message.guild.roles.cache.get(msg6.content)
                                if(!roles) {
                                    message.reply(`\`❌\` Ceci n'est pas un rôle valide !`)
                                    msg6.delete()
                                    msg5.delete()
                                    msg4.delete()
                                    msg3.delete()
                                    msg2.delete()
                                    return msg1.delete()
                                }
                                msg6.delete()
                                msg5.delete()
                                msg4.delete()
                                msg3.delete()
                                msg2.delete()
                                msg1.delete()

                                const embed2 = new Discord.EmbedBuilder()
                                .setTitle(`Item ajouté !`)
                                .setDescription(`Nom: ${msg2.content}\nPrix: ${msg4.content}\nRôle: ${roles}`)
                                .setColor(color)

                                bot.db.query(`INSERT INTO items (guildId, name, prix, roleId) VALUES ("${message.guild.id}", "${msg2.content}", "${msg4.content}", "${roles.id}")`);

                                bot.db.query(`SELECT * FROM items WHERE guildId = ${message.guild.id}`, async (err, req) => {
                                    if(req.length < 1) {
                                        items = "Aucun item n'a été ajouté dans le shop du serveur !"
                                    } else {
                                        req.forEach((row) => {
                                            const name = row.name;
                                            const role = row.roleId;
                                            const prix = row.prix
                                            items += `${counter}) ${name} (<@&${role}>)\nPrix: \`${prix} coins\`\n`;
                                            counter = Number(counter) + 1
                                          });
                                    }
                            
                                    const embed3 = new Discord.EmbedBuilder()
                                    .setAuthor({ name: `Panel de configuration du shop de ${message.guild.name}` })
                                    .setDescription(items)
                                    .addFields({ name: `➕`, value: `Ajouter un rôle au shop`, inline: true })
                                    .addFields({ name: `➖`, value: `Retire un rôle du shop`, inline: true})
                                    .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
                                    .setColor(color)

                                items = ""
                                counter = 1
                                msg.edit({ embeds: [embed3] })

                                message.channel.send({ embeds: [embed2] })
  
                            })
                            })
                        })
                })
            }
        })

    })
}
