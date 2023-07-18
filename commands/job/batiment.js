const Discord = require("discord.js")

exports.help = {
    name: "batiment",
    category: "job",
    aliases: ["bâtiment" , "bat" , "bar" , "magasin" , "garage" , "gare" , "cinema" , "entrepot" , "mairie"],
    description: "Affiche votre entrepôt et l'argent produit par vos bâtiments",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let bar, garage, magasin, cinema, gare, mairie, number;

    

    bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
    
    number = Number(req[0].entrepot)
    bar = req[0].bar
    if(bar == "no") bar = "Non Possédé"
    if(bar == "yes") bar = "Possédé"
    garage = req[0].garage
    if(garage == "no") garage = "Non Possédé"
    if(garage == "yes") garage = "Possédé"
    magasin = req[0].magasin
    if(magasin == "no") magasin = "Non Possédé"
    if(magasin == "yes") magasin = "Possédé"
    cinema = req[0].cinema
    if(cinema == "no") cinema = "Non Possédé"
    if(cinema == "yes") cinema = "Possédé"
    gare = req[0].gare
    if(gare == "no") gare = "Non Possédé"
    if(gare == "yes") gare = "Possédé"
    mairie = req[0].mairie
    if(mairie == "no") mairie = "Non Possédé"
    if(mairie == "yes") mairie = "Possédé"
    let squares = '';
    const blueSquares = Math.floor(number / 1000);
    const redSquares = 5 - blueSquares;
    for (let i = 0; i < blueSquares; i++) {
        squares += ':blue_square:';
    }
    for (let i = 0; i < redSquares; i++) {
        squares += ':red_square:';
    }

    const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Argent dans votre entrepôt: ${number}/5000` })
        .setDescription(`Statut: ${squares}\n\n\`📤\` - Récupérer l'argent des batiments\n\`📞\` - Vendre un batiment\n\n\`\`\` \`\`\`\n\n**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n\n*Utilisez la commande \`buy\` pour acheter un ou plusieurs batiments !*`)
        .setColor(color)
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129756123432493056/XMpaHMNeySpMO8MAGmkMd0GB0E27hjsai5uKAushFMf8SYcJ_xucp5WUQ2x-ACOUZJ-i.png?width=1024&height=1024`)

        const MenuSelection = new Discord.StringSelectMenuBuilder()
            .setCustomId('MenuSelectionCounter')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Sélectionner un item à acheter")
                .addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Récolter")
                        .setValue("recoltbat")
                        .setEmoji(`📤`)
                        .setDescription(`Récolte l'argent stocké dans votre entrepôt !`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Vendre")
                        .setValue("sellbat")
                        .setEmoji(`📞`)
                        .setDescription(`Permet de vendre un batiment`),
                )

    const msg = await message.reply({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents([MenuSelection])] });

    const collector = msg.createMessageComponentCollector({});
              
    collector.on('collect', async (interaction) => {
        interaction.deferUpdate()
        if(interaction.values[0] == "recoltbat") {
            if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
            if(number == "0") return interaction.channel.send(`:x: Vous n'avez pas d'argent dans votre entrepôt !`)

            const batment = new Discord.EmbedBuilder()
            .setDescription(`:coin: ${number} coins ont été retiré de votre entrepôt !`)
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})

            bot.db.query(`UPDATE batiment SET entrepot = '0' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE user SET coins = coins + ${number} WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            number = 0

            let squares2 = '';
            const blueSquares = Math.floor(number / 1000);
            const redSquares = 5 - blueSquares;
            for (let i = 0; i < blueSquares; i++) {
                squares2 += ':blue_square:';
            }
            for (let i = 0; i < redSquares; i++) {
                squares2 += ':red_square:';
            }
            const newbat = new Discord.EmbedBuilder()
            .setAuthor({ name: `Argent dans votre entrepôt: ${number}/5000` })
            .setDescription(`Statut: ${squares2}\n\n\`📤\` - Récupérer l'argent des batiments\n\`📞\` - Vendre un batiment\n\n\`\`\` \`\`\`\n\n**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n\n*Utilisez la commande \`buy\` pour acheter un ou plusieurs batiments !*`)
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129756123432493056/XMpaHMNeySpMO8MAGmkMd0GB0E27hjsai5uKAushFMf8SYcJ_xucp5WUQ2x-ACOUZJ-i.png?width=1024&height=1024`)


            msg.edit({ embeds: [newbat] })
            message.channel.send({ embeds: [batment] })


        }

        if(interaction.values[0] == "sellbat") {
            if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
            const messa = await interaction.channel.send(`Entrez maintenant le nom du bâtiment que vous souhaitez vendre:`)

            let filter2 = (m) => m.author.id == interaction.user.id;
                    await interaction.channel.awaitMessages({ 
                        filter: filter2,
                        max: 1
                    }).then(async (collected) => {
                        if(collected.first().content.toLowerCase() == 'bar') {
                            bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                if(req[0].bar == 'no') return interaction.channel.send(`:x: Vous n'avez pas de ${collected.first().content.toLowerCase} !`)

                            bot.db.query(`UPDATE batiment SET ${collected.first().content.toLowerCase()} = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                            bot.db.query(`UPDATE user SET coins = coins + 1500 WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                            bar = "Non Possédé"

                            const embedpay = new Discord.EmbedBuilder()
                            .setDescription(`Vous avez vendu ${collected.first().content.toLowerCase()} pour \`1500 coins\` !`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            
                            message.channel.send({ embeds: [embedpay] })

                            const newbat = new Discord.EmbedBuilder()
                            .setAuthor({ name: `Argent dans votre entrepôt: ${number}/5000` })
                            .setDescription(`Statut: ${squares}\n\n\`📤\` - Récupérer l'argent des batiments\n\`📞\` - Vendre un batiment\n\n\`\`\` \`\`\`\n\n**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n\n*Utilisez la commande \`buy\` pour acheter un ou plusieurs batiments !*`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129756123432493056/XMpaHMNeySpMO8MAGmkMd0GB0E27hjsai5uKAushFMf8SYcJ_xucp5WUQ2x-ACOUZJ-i.png?width=1024&height=1024`)


                            msg.edit({ embeds: [newbat] })
                            })
                        } else if(collected.first().content.toLowerCase() == 'garage') {
                            bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                if(req[0].garage == 'no') return interaction.channel.send(`:x: Vous n'avez pas de ${collected.first().content.toLowerCase} !`)

                            bot.db.query(`UPDATE batiment SET ${collected.first().content.toLowerCase()} = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                            bot.db.query(`UPDATE user SET coins = coins + 2000 WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                            garage = "Non Possédé"

                            const embedpay = new Discord.EmbedBuilder()
                            .setDescription(`Vous avez vendu ${collected.first().content.toLowerCase()} pour \`2000 coins\` !`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            
                            message.channel.send({ embeds: [embedpay] })

                            const newbat = new Discord.EmbedBuilder()
                            .setAuthor({ name: `Argent dans votre entrepôt: ${number}/5000` })
                            .setDescription(`Statut: ${squares}\n\n\`📤\` - Récupérer l'argent des batiments\n\`📞\` - Vendre un batiment\n\n\`\`\` \`\`\`\n\n**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n\n*Utilisez la commande \`buy\` pour acheter un ou plusieurs batiments !*`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129756123432493056/XMpaHMNeySpMO8MAGmkMd0GB0E27hjsai5uKAushFMf8SYcJ_xucp5WUQ2x-ACOUZJ-i.png?width=1024&height=1024`)


                            msg.edit({ embeds: [newbat] })
                            })
                        } else if(collected.first().content.toLowerCase() == 'magasin') {
                            bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                if(req[0].magasin == 'no') return interaction.channel.send(`:x: Vous n'avez pas de ${collected.first().content.toLowerCase} !`)

                            bot.db.query(`UPDATE batiment SET ${collected.first().content.toLowerCase()} = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                            bot.db.query(`UPDATE user SET coins = coins + 3000 WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                            magasin = "Non Possédé"

                            const embedpay = new Discord.EmbedBuilder()
                            .setDescription(`Vous avez vendu ${collected.first().content.toLowerCase()} pour \`3000 coins\` !`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            
                            message.channel.send({ embeds: [embedpay] })

                            const newbat = new Discord.EmbedBuilder()
                            .setAuthor({ name: `Argent dans votre entrepôt: ${number}/5000` })
                            .setDescription(`Statut: ${squares}\n\n\`📤\` - Récupérer l'argent des batiments\n\`📞\` - Vendre un batiment\n\n\`\`\` \`\`\`\n\n**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n\n*Utilisez la commande \`buy\` pour acheter un ou plusieurs batiments !*`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129756123432493056/XMpaHMNeySpMO8MAGmkMd0GB0E27hjsai5uKAushFMf8SYcJ_xucp5WUQ2x-ACOUZJ-i.png?width=1024&height=1024`)


                            msg.edit({ embeds: [newbat] })
                            })
                        } else if(collected.first().content.toLowerCase() == 'cinema') {
                            bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                if(req[0].cinema == 'no') return interaction.channel.send(`:x: Vous n'avez pas de ${collected.first().content.toLowerCase} !`)

                            bot.db.query(`UPDATE batiment SET ${collected.first().content.toLowerCase()} = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                            bot.db.query(`UPDATE user SET coins = coins + 4000 WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                            cinema = "Non Possédé"

                            const embedpay = new Discord.EmbedBuilder()
                            .setDescription(`Vous avez vendu ${collected.first().content.toLowerCase()} pour \`4000 coins\` !`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            
                            message.channel.send({ embeds: [embedpay] })

                            const newbat = new Discord.EmbedBuilder()
                            .setAuthor({ name: `Argent dans votre entrepôt: ${number}/5000` })
                            .setDescription(`Statut: ${squares}\n\n\`📤\` - Récupérer l'argent des batiments\n\`📞\` - Vendre un batiment\n\n\`\`\` \`\`\`\n\n**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n\n*Utilisez la commande \`buy\` pour acheter un ou plusieurs batiments !*`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129756123432493056/XMpaHMNeySpMO8MAGmkMd0GB0E27hjsai5uKAushFMf8SYcJ_xucp5WUQ2x-ACOUZJ-i.png?width=1024&height=1024`)


                            msg.edit({ embeds: [newbat] })
                            })
                        } else if(collected.first().content.toLowerCase() == 'gare') {
                            bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                if(req[0].gare == 'no') return interaction.channel.send(`:x: Vous n'avez pas de ${collected.first().content.toLowerCase} !`)

                            bot.db.query(`UPDATE batiment SET ${collected.first().content.toLowerCase()} = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                            bot.db.query(`UPDATE user SET coins = coins + 5500 WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                            gare = "Non Possédé"

                            const embedpay = new Discord.EmbedBuilder()
                            .setDescription(`Vous avez vendu ${collected.first().content.toLowerCase()} pour \`5500 coins\` !`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            
                            message.channel.send({ embeds: [embedpay] })

                            const newbat = new Discord.EmbedBuilder()
                            .setAuthor({ name: `Argent dans votre entrepôt: ${number}/5000` })
                            .setDescription(`Statut: ${squares}\n\n\`📤\` - Récupérer l'argent des batiments\n\`📞\` - Vendre un batiment\n\n\`\`\` \`\`\`\n\n**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n\n*Utilisez la commande \`buy\` pour acheter un ou plusieurs batiments !*`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129756123432493056/XMpaHMNeySpMO8MAGmkMd0GB0E27hjsai5uKAushFMf8SYcJ_xucp5WUQ2x-ACOUZJ-i.png?width=1024&height=1024`)


                            msg.edit({ embeds: [newbat] })
                            })
                        } else if(collected.first().content.toLowerCase() == 'mairie') {
                            bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                if(req[0].mairie == 'no') return interaction.channel.send(`:x: Vous n'avez pas de ${collected.first().content.toLowerCase} !`)

                            bot.db.query(`UPDATE batiment SET ${collected.first().content.toLowerCase()} = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                            bot.db.query(`UPDATE user SET coins = coins + 7000 WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                            mairie = "Non Possédé"

                            const embedpay = new Discord.EmbedBuilder()
                            .setDescription(`Vous avez vendu ${collected.first().content.toLowerCase()} pour \`7000 coins\` !`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            
                            message.channel.send({ embeds: [embedpay] })

                            const newbat = new Discord.EmbedBuilder()
                            .setAuthor({ name: `Argent dans votre entrepôt: ${number}/5000` })
                            .setDescription(`Statut: ${squares}\n\n\`📤\` - Récupérer l'argent des batiments\n\`📞\` - Vendre un batiment\n\n\`\`\` \`\`\`\n\n**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n\n*Utilisez la commande \`buy\` pour acheter un ou plusieurs batiments !*`)
                            .setColor(color)
                            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1129756123432493056/XMpaHMNeySpMO8MAGmkMd0GB0E27hjsai5uKAushFMf8SYcJ_xucp5WUQ2x-ACOUZJ-i.png?width=1024&height=1024`)


                            msg.edit({ embeds: [newbat] })
                            })
                        }
                    })


        }

    })

})
}