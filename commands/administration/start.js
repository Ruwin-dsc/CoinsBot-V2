const Discord = require("discord.js")
const ms = require("ms")

exports.help = {
    name: "start",
    category: "administration",
    aliases: ["enchere", "enchère"],
    description: "Lance une enchère",
    usage: "start",
    permission: "whiteList"
}

exports.run = async (bot, message, args, color) => {
    let salon = message.channel, time = "3m", gain = "5", prix = 200, enrichisseur = "Aucun enchérisseur", dernierenrichisseur = "a", timestamp, timestamp2, prixfinal, msgEnchere

    const MenuSelection = new Discord.StringSelectMenuBuilder()
            .setCustomId('MenuSelectionCounter')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Modifier un paramètre")
                .addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Salon")
                        .setValue("channelenchere")
                        .setEmoji(`🌐`)
                        .setDescription(`Récolte l'argent stocké dans votre entrepôt !`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Temps")
                        .setValue("timeenchere")
                        .setEmoji(`🕙`)
                        .setDescription(`Modifier la durée de l'enchère`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Gain")
                        .setValue("gainenchere")
                        .setEmoji(`🎁`)
                        .setDescription(`Modifier la récompenses de l'enchère`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Prix")
                        .setValue("prixenchere")
                        .setEmoji(`💰`)
                        .setDescription(`Modifier la somme ajoutée à l'enchère par participation`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Start")
                        .setValue("startenchere")
                        .setEmoji(`🎉`)
                        .setDescription(`Lance l'enchère avec vos paramètres`),
                )

    const embed = new Discord.EmbedBuilder()
    .setTitle(`Panel de l'enchère`)
    .addFields(
        { name: `🌐 Salon`, value: `${salon}`, inline: true },
        { name: `🕙 Temps`, value: `${time}`, inline: true },
        { name: `🎁 Gain`, value: `${gain}`, inline: true },
        { name: `💰 Prix`, value: `${prix}`, inline: true }
        )
    .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1130198413053534281/3d-illustration-of-auction-document-png.png?width=800&height=800`)
    .setColor(color)

    const msg = await message.channel.send({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents([MenuSelection])] })

        const collector = msg.createMessageComponentCollector({});
        let filter2 = (m) => m.author.id === message.author.id
              
    collector.on('collect', async (interaction) => {
        interaction.deferUpdate()

        if(interaction.values[0] == "channelenchere") {
            const salonmsg = await interaction.channel.send(`Quel est le salon de l'enchère ?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected) => {
        
                        var mess = collected.first();
                     const channelo = interaction.message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
                    if(!channelo) { 
                        return message.channel.send({ content: `:x: Salon invalide !`});
                    } else {
                    salon = channelo
                    const embed2 = new Discord.EmbedBuilder()
                    .setTitle(`Panel de l'enchère`)
                    .addFields(
                        { name: `🌐 Salon`, value: `${salon}`, inline: true },
                        { name: `🕙 Temps`, value: `${time}`, inline: true },
                        { name: `🎁 Gain`, value: `${gain}`, inline: true },
                        { name: `💰 Prix`, value: `${prix}`, inline: true }
                        )
                    .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1130198413053534281/3d-illustration-of-auction-document-png.png?width=800&height=800`)
                    .setColor(color)

                    msg.edit({ embeds: [embed2] })
                    message.channel.send(`Vous avez configuré le salon de l'enchère avec succès !`)
                    }                
                })
        }

        if(interaction.values[0] == "timeenchere") {
            const salonmsg = await interaction.channel.send(`Quel est la durée de l'enchère ? (\`s = secondes, m = minutes, h = heures, j = jours\`)`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected) => {
        
                        var mess = collected.first().content;
                        try {
                            ms(mess);
                            time = collected.first().content;
                    const embed2 = new Discord.EmbedBuilder()
                    .setTitle(`Panel de l'enchère`)
                    .addFields(
                        { name: `🌐 Salon`, value: `${salon}`, inline: true },
                        { name: `🕙 Temps`, value: `${time}`, inline: true },
                        { name: `🎁 Gain`, value: `${gain}`, inline: true },
                        { name: `💰 Prix`, value: `${prix}`, inline: true }
                        )
                    .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1130198413053534281/3d-illustration-of-auction-document-png.png?width=800&height=800`)
                    .setColor(color)

                    msg.edit({ embeds: [embed2] })
                    message.channel.send(`Vous avez configuré la durée de l'enchère avec succès !`)
                        } catch (error) {
                            return message.channel.send({ content: `:x: temps invalide !`});
                        }
                        
                })
        }

        if(interaction.values[0] == "gainenchere") {
            const salonmsg = await interaction.channel.send(`Quel est sera le gain de l'enchère ?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected) => {
                                    gain = collected.first().content;
                    const embed2 = new Discord.EmbedBuilder()
                    .setTitle(`Panel de l'enchère`)
                    .addFields(
                        { name: `🌐 Salon`, value: `${salon}`, inline: true },
                        { name: `🕙 Temps`, value: `${time}`, inline: true },
                        { name: `🎁 Gain`, value: `${gain}`, inline: true },
                        { name: `💰 Prix`, value: `${prix}`, inline: true }
                        )
                    .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1130198413053534281/3d-illustration-of-auction-document-png.png?width=800&height=800`)
                    .setColor(color)

                    msg.edit({ embeds: [embed2] })
                    message.channel.send(`Vous avez configuré le gain de l'enchère avec succès !`)
                        
                })
        }
        if(interaction.values[0] == "prixenchere") {
            const salonmsg = await interaction.channel.send(`Veuillez entrer l'augmentation de l'enchère par clique (recommandé: \`200\`):`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected) => {
                    const nombre = collected.first().content;
                    if(isNaN(nombre)) return message.channel.send(`Merci d'indiquer un nombre valide`)
                    if(Number(nombre) <= 0) return message.channel.send(`Merci d'indiquer un nombre valide`)

                    prix = nombre
                    const embed2 = new Discord.EmbedBuilder()
                    .setTitle(`Panel de l'enchère`)
                    .addFields(
                        { name: `🌐 Salon`, value: `${salon}`, inline: true },
                        { name: `🕙 Temps`, value: `${time}`, inline: true },
                        { name: `🎁 Gain`, value: `${gain}`, inline: true },
                        { name: `💰 Prix`, value: `${prix}`, inline: true }
                        )
                    .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1130198413053534281/3d-illustration-of-auction-document-png.png?width=800&height=800`)
                    .setColor(color)

                    msg.edit({ embeds: [embed2] })
                    message.channel.send(`Vous avez configuré le prix de l'enchère avec succès !`)
                        
                })
        }

        if(interaction.values[0] == "startenchere") {
            msg.delete()
            const durationInMs = ms(time);
            const now = new Date();
            const futureDate = new Date(now.getTime() + durationInMs);
            timestamp = Math.floor(futureDate.getTime() / 1000);
            timestamp2 = futureDate.getTime();

            prixfinal = prix

            const embed3 = new Discord.EmbedBuilder()
            .setTitle(gain)
            .setDescription(`Réagissez avec :tada: pour enchérir !\nSe termine <t:${timestamp}:R> (<t:${timestamp}:f>)\nLancée par: ${message.author}\n\n${enrichisseur}\nDernier prix: **${prixfinal} coins**\n\n:warning: Le bot ne prend que vos coins en banque !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1130410429101899876/Ventes-aux-encheres-de-destockage.png?width=2476&height=1054`)
            .setTimestamp(timestamp2)
            .setFooter({ text: `CoinsBot | Se termine`})

                const buttonEnchere = new Discord.ButtonBuilder()
                .setEmoji(`🎉`)
                .setLabel(`${prixfinal}`)
                .setCustomId("addenchere")
                .setStyle(Discord.ButtonStyle.Success),
    

            msgEnchere = await salon.send({ embeds: [embed3], components: [new Discord.ActionRowBuilder().addComponents(buttonEnchere)] })
            message.reply(`Enchère créée dans ${salon}`)

            const collector2 = msgEnchere.createMessageComponentCollector({
                time: ms(time)
            });

            collector2.on('collect', async (interaction2) => {

            if(interaction2.customId == "addenchere") {
            if(interaction2.user.id == dernierenrichisseur) return interaction2.reply({ content: `Vous ne pouvez pas enrichir 2x de suite !`, ephemeral: true })

            bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${interaction2.user.id}"`, async (err, req) => {
                const bankCoins = req[0].banque
                if(bankCoins < prixfinal) return interaction2.reply({ content: `Vous n'avez pas assez dans votre banque pour enrichir !`, ephemeral: true })

                prixfinal = Number(prixfinal) + Number(prix)
                buttonEnchere.setLabel(`${prixfinal}`);

                enrichisseur = `Dernier enrichisseur: ${interaction2.user}`
                dernierenrichisseur = interaction2.user.id

            const embed3 = new Discord.EmbedBuilder()
                .setTitle(gain)
                .setDescription(`Réagissez avec :tada: pour enchérir !\nSe termine <t:${timestamp}:R> (<t:${timestamp}:f>)\nLancée par: ${message.author}\n\n${enrichisseur}\nDernier prix: **${prixfinal} coins**\n\n:warning: Le bot ne prend que vos coins en banque !`)
                .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1130410429101899876/Ventes-aux-encheres-de-destockage.png?width=2476&height=1054`)
                .setTimestamp(timestamp2)
                .setFooter({ text: `CoinsBot | Se termine`})

                msgEnchere.edit({ embeds: [embed3], components: [new Discord.ActionRowBuilder().addComponents(buttonEnchere)]})
                interaction2.reply({ content: `Vous avez enrichi pour ${prixfinal} !`, ephemeral: true })
            })
        }
            })
        
            collector2.on('end', async (interaction2) => {
                if(dernierenrichisseur == "a") {
                    const embed3 = new Discord.EmbedBuilder()
                .setTitle(gain)
                .setDescription(`Réagissez avec :tada: pour enchérir !\nSe termine <t:${timestamp}:R> (<t:${timestamp}:f>)\nLancée par: ${message.author}\n\n${enrichisseur}\nDernier prix: **${prixfinal} coins**`)
                .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1130410429101899876/Ventes-aux-encheres-de-destockage.png?width=2476&height=1054`)
                .setTimestamp(timestamp2)
                .setFooter({ text: `CoinsBot | Terminé`})

                msgEnchere.edit({ embeds: [embed3]})
                    msgEnchere.reply({ content: `Personne n'a participé à cette enchère.` })
                } else {
                const embed3 = new Discord.EmbedBuilder()
                .setTitle(gain)
                .setDescription(`Réagissez avec :tada: pour enchérir !\nSe termine <t:${timestamp}:R> (<t:${timestamp}:f>)\nLancée par: ${message.author}\n\n${enrichisseur}\nDernier prix: **${prixfinal} coins**`)
                .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1130410429101899876/Ventes-aux-encheres-de-destockage.png?width=2476&height=1054`)
                .setTimestamp(timestamp2)
                .setFooter({ text: `CoinsBot | Terminé`})

                msgEnchere.edit({ embeds: [embed3], components: [] })

                msgEnchere.reply({ content: `Le prix ${gain} a été remporté par <@${dernierenrichisseur}> en misant ${prixfinal} !\nLes coins ont été prélevé de sa banque !` })
                bot.db.query(`UPDATE user SET banque = banque - ${Number(prixfinal)} WHERE guildId = "${message.guild.id}" AND userId = "${dernierenrichisseur}"`);
                }

            })
        }
    
    })

    



}