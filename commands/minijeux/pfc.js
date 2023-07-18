const Discord = require("discord.js")

exports.help = {
    name: "pfc",
    category: "minijeux",
    aliases: ["pierre-feuille-ciseau"],
    description: "Lance un pierre feuille ciseau",
    usage: "pfc @user <mise>"
}

exports.run = async (bot, message, args, color) => {
    let coinauthor, coinauthor2, coinsauthorfin, coinauthor2fin, remove1, remove2, msg2, authorchoice, opponentchoice;

    const opponent = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!opponent) return message.reply(`:x: \`ERROR:\` Pas de membre trouvé !`)
    if(opponent.id == message.author.id) return message.channel.send(`Tu peux pas jouer avec toi même !`)
    const miseajouer = args[1]
    if(!miseajouer) return message.reply(`:x: Merci de préciser une somme à jouer !`)
    if(isNaN(miseajouer)) return message.reply(":x: Ceci n'est pas un chiffre valide !")
    if(Number(miseajouer) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")

    const nomoney = new Discord.EmbedBuilder()
    .setDescription(`:x: Vous n'avez pas assez !`)
    .setColor(color)

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')
        coinauthor = req[0].coins

        if(Number(coinauthor) < Number(args[1])) {
            return message.reply({ embeds: [nomoney] })
        } else {
            
                bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${opponent.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Cette utilisateur n\'a pas encore commencer les coins dîtes lui d\'envoyer un message !')
        coinauthor2 = req[0].coins

        if(Number(coinauthor2) < Number(args[1])) {
            return message.reply(`:x: **${opponent.username} n'a pas assez de coins pour jouer avec vous !** Il doit avoir en main la somme misée pour jouer !`)
        } else {
            const accept = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji(`\✅`)
                .setCustomId("acceptpfc")
                .setStyle(Discord.ButtonStyle.Success),
            )
            const msg = await message.reply({ content: `:question: ${opponent} acceptes-tu le duel de **Pierre feuille ciseau** avec une mise de ${args[1]} coins contre ${message.author} ?\n\n*Tu as 30 secondes pour accepter*`, components: [accept] })

            const collector2 = msg.createMessageComponentCollector({
                time: 30000
            });

    collector2.on('collect', async (interaction) => {
            if (interaction.customId === 'acceptpfc') {
                coinsauthorfin = Number(coinauthor) + Number(args[1])
                coinauthor2fin = Number(coinauthor2) +  Number(args[1])

                remove1 = Number(coinauthor) - Number(args[1])
                remove2 = Number(coinauthor2) - Number(args[1])
                if(interaction.user.id !== opponent.id) return interaction.reply({ content: `C'est ${opponent.username} qui doit cliquer ici !`, ephemeral: true})
                msg.delete()
                const ExplicationEmbed = new Discord.EmbedBuilder()
                .setTitle(`Pierre feuille ciseau entre entre ${message.author.username} et ${opponent.username}`)
                .setDescription(`**Objectif**:\nChoisir le bon objet pour battre l'adversaire !\n__Exemples:__`)
                .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1126912625968693268/Capture_decran_2023-07-07_a_18.28.21.png?width=1000&height=312`)
                .setFooter({ text: `5 secondes avant le début` })
                .setColor(color)

                 msg2 = await message.channel.send({ embeds: [ExplicationEmbed] })

                wait(5000).then(async () => {
                    msg2.delete()
                    const choicemenus = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                        .setLabel(`Pierre`)
                        .setCustomId("pierrex")
                        .setDisabled(true)
                        .setStyle(Discord.ButtonStyle.Secondary),
                        new Discord.ButtonBuilder()
                        .setLabel(`Feuille`)
                        .setCustomId("feuillex")
                        .setDisabled(true)
                        .setStyle(Discord.ButtonStyle.Secondary),
                        new Discord.ButtonBuilder()
                        .setLabel(`Ciseau`)
                        .setCustomId("ciseaux")
                        .setDisabled(true)
                        .setStyle(Discord.ButtonStyle.Secondary),
                    )

                    const choicemenus2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                        .setLabel(`Pierre`)
                        .setCustomId("pierre")
                        .setStyle(Discord.ButtonStyle.Secondary),
                        new Discord.ButtonBuilder()
                        .setLabel(`Feuille`)
                        .setCustomId("feuille")
                        .setStyle(Discord.ButtonStyle.Secondary),
                        new Discord.ButtonBuilder()
                        .setLabel(`Ciseau`)
                        .setCustomId("ciseau")
                        .setStyle(Discord.ButtonStyle.Secondary),
                    )

                    const msg23 = await message.channel.send({ content: `_ _        :right_fist:       **Pierre**         :left_fist:`, components: [choicemenus]})
                    wait(2000).then(async () => {
                        msg23.edit({ content: `_ _        :right_fist:       **Feuille**         :left_fist:`})
                        wait(2000).then(async () => {
                        msg23.edit({ content: `_ _        :right_fist:       **Ciseau**         :left_fist:`})

                        wait(2000).then(async () => {

                        msg23.edit({ content: `_ _      :right_fist:       **Choisissez !**       :left_fist:`, components: [choicemenus2]})

                        const filter = (button) => {
                            return button.user.id === message.author.id || button.user.id === opponent.id;
                        };

                        const collector2 = msg23.createMessageComponentCollector({ filter, componentType: Discord.ComponentType.Button, max: 2 });

                        collector2.on('collect', (button) => {
                                if (button.customId === "pierre") {
                                if(button.user.id === message.author.id) authorchoice = "pierre"
                                if(button.user.id === opponent.id) opponentchoice = "pierre"

                                button.reply({ content: `${button.user}, vous avez choisi **Pierre** !`, ephemeral: true})
                            }
                            if (button.customId === "feuille") {
                                if(button.user.id === message.author.id) authorchoice = "feuille"
                                if(button.user.id === opponent.id) opponentchoice = "feuille"

                                button.reply({ content: `${button.user}, vous avez choisi **Feuille** !`, ephemeral: true})
                            }
                            if (button.customId === "ciseau") {
                                if(button.user.id === message.author.id) authorchoice = "ciseau"
                                if(button.user.id === opponent.id) opponentchoice = "ciseau"

                                button.reply({ content: `${button.user}, vous avez choisi **Ciseau** !`, ephemeral: true})
                            }

                        })

                        collector2.on('end', (collected) => {
                            if (authorchoice && opponentchoice) {
                                if(authorchoice == "pierre" && opponentchoice == "ciseau") {
                                    bot.db.query(`UPDATE user SET coins = '${coinsauthorfin}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${remove2}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Victoire de ${message.author} !\nIl a choisi **Pierre** et ${opponent} a choisi **Ciseau** !`)
                                } else if(authorchoice == "feuille" && opponentchoice == "pierre") {
                                    bot.db.query(`UPDATE user SET coins = '${coinsauthorfin}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${remove2}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Victoire de ${message.author} !\nIl a choisi **Feuille** et ${opponent} a choisi **Pierre** !`)
                                } else if(authorchoice == "ciseau" && opponentchoice == "pierre") {
                                    bot.db.query(`UPDATE user SET coins = '${coinsauthorfin}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${remove2}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Victoire de ${opponent.id} !\nIl a choisi **Ciseau** et ${opponent} a choisi **Pierre** !`)
                                } else if(opponentchoice == "pierre" && authorchoice == "ciseau") {
                                    bot.db.query(`UPDATE user SET coins = '${remove1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${coinauthor2fin}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Victoire de ${opponent} !\nIl a choisi **Pierre** et ${message.author} a choisi **Ciseau** !`)
                                } else if(opponentchoice == "feuille" && authorchoice == "pierre") {
                                    bot.db.query(`UPDATE user SET coins = '${remove1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${coinauthor2fin}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Victoire de ${opponent} !\nIl a choisi **Feuille** et ${message.author} a choisi **Pierre** !`)
                                } else if(opponentchoice == "ciseau" && authorchoice == "feuille") {
                                    bot.db.query(`UPDATE user SET coins = '${remove1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${coinauthor2fin}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Victoire de ${opponent} !\nIl a choisi **Ciseau** et ${message.author} a choisi **Feuille** !`)
                                } else if(opponentchoice == "pierre" && authorchoice == "pierre") {
                                    bot.db.query(`UPDATE user SET coins = '${remove1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${coinauthor2fin}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Egalité !\nVous avez tous les deux choisi **pierre** !`)
                                } else if(opponentchoice == "feuille" && authorchoice == "feuille") {
                                    bot.db.query(`UPDATE user SET coins = '${remove1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${coinauthor2fin}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Egalité !\nVous avez tous les deux choisi **feuille** !`)
                                } else if(opponentchoice == "ciseau" && authorchoice == "ciseau") {
                                    bot.db.query(`UPDATE user SET coins = '${remove1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    bot.db.query(`UPDATE user SET coins = '${coinauthor2fin}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
                                    msg23.reply(`> Egalité !\nVous avez tous les deux choisi **ciseau** !`)
                                }
                            }                        
                        });


                    })
                    })
                    })
                })

            }})
}})}})}

function wait(temps) {
  return new Promise(resolve => setTimeout(resolve, temps));
}