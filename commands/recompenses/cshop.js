const Discord = require("discord.js")

exports.help = {
    name: "cshop",
    category: "récompenses",
    aliases: ["servershop", "customshop"],
    description: "Permet d'acheter les rôles du shop du serveur",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let items = ""
    bot.db.query(`SELECT * FROM items WHERE guildId = ${message.guild.id}`, async (err, req) => {
        if(req.length < 1) {
            message.reply(`:x: Aucun item n'a été ajouté au shop du serveur !\nUtilisez la commande \`items\` pour en ajouter !`)
        } else {
            req.forEach((row) => {
                const name = row.name;
                const role = row.roleId;
                const prix = row.prix
                items += `${name} ( <@&${role}> )\n\`Prix: ${prix} coins\`\n`;
              });

              const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `Voici la liste des items du serveur (${req.length})` })
                .setDescription(items)
                .setFooter({ text: `♥ CoinsBot by WhiteHall`})
                .setColor(color)

                let menuOption = []; 
                    for (let i = 0; i < req.length; i++) {
                      
                      const option = req[i];
                      const valuesname = option.name.replace(/ /g, "_");
                      menuOption.push({ 
                        name: `${option.name}`,
                        value: `${valuesname}`, 
                        description: `Prix: ${option.prix}`, 
                      }); 
                    }


                    let menuSelect = new Discord.StringSelectMenuBuilder()
                      .setCustomId('CSHOP')
                      .setPlaceholder("Sélectionner un item à acheter !")
                      .addOptions(menuOption.map(opt => {
                        return {
                          label: opt.name,
                          value: opt.value,
                          description: opt.description,
                        }                        
                      }))
                
                      const msg = await message.reply({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents([menuSelect])] })

                      const col = await msg.createMessageComponentCollector({})

                      col.on("collect", async (i) => {
                        if(i.user.id !== message.author.id) return i.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true})

                        bot.db.query(`SELECT * FROM items WHERE guildId = "${message.guild.id}" AND name = "${i.values[0].replace(/_/g, " ")}"`, async (err, req) => {
                            const price = req[0].prix
                            const roleId = req[0].roleId
                            bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                const embed1 = new Discord.EmbedBuilder()
                                .setDescription(`:x: Vous n'avez pas assez de coins`)
                                .setColor(color)
                                .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
                            if(price > req[0].coins) return i.reply({ embeds: [embed1] })

                            const newprix = Number(req[0].coins) - Number(price)

                            const role = message.guild.roles.cache.get(roleId)
                            if(!role) return i.reply(`\`❌\` Le rôle est introuvable !`)

                            if(message.member.roles.cache.has(roleId)) {
                                return i.reply(`\`❌\` Vous avez déjà ce rôle !`)
                            } else {
                                try {
                                    bot.db.query(`UPDATE user SET coins = ${newprix} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);
                                    await message.member.roles.add(roleId)
                                    i.reply({ content: `Vous venez d'acheter un \`${i.values[0].replace(/_/g, " ")}\` pour \`${price} coins\` et avez reçu le rôle **${role.name}** !`})
                                } catch (e) {
                                    console.log(e)
                                    return i.reply(`\`❌\` Une erreur s'est produite lorsque j'ai essayé d'ajouter le rôle, vous avez été remboursé !`)
                                }
                            }

                            })

                        })

                      })
        }
        })
    }
