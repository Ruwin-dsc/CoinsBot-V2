const Discord = require("discord.js")

exports.help = {
    name: "buy",
    category: "récompenses",
    aliases: ["bought"],
    description: "Permets d'acheter les items du shop du bot",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let bar, garage, magasin, cinema, gare, mairie;

    bot.db.query(`SELECT * FROM gain WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        bar = req[0].bar
        garage = req[0].garage
        magasin = req[0].magasin
        cinema = req[0].cinéma
        gare = req[0].gare
        mairie = req[0].mairie

    const shopEmbed = new Discord.EmbedBuilder()
    .setTitle(`Voici la boutique du serveur ${message.guild.name}`)
    .setDescription(`**Bar**\nPrix: 200\nGain: 100\n**Garage**\nPrix: 3000\nGain: 200\n**Magasin**\nPrix: 4000\nGain: 300\n**Cinema**\nPrix: 5000\nGain: 400\n**Gare**\nPrix: 6500\nGain: 500\n**Mairie**\nPrix: 8000\nGain: 600\n**anti-rob**\nPrix: 1000\nDéfini le temps d'anti-rob à 2 heures, 0 minute et 0 seconde\n**wagon**\nPrix: 1500\nAccès aux commandes \`mine\` et \`wagon\``)
    .setFooter({ text: `Les récompenses des bâtiments sont attribuées toutes les 2h30` })
    .setColor(color)

    const MenuSelection = new Discord.StringSelectMenuBuilder()
            .setCustomId('MenuSelectionCounter')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Sélectionner un item à acheter")
                .addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("[BAT] Bar")
                        .setValue("barbuy")
                        .setDescription(`Prix: 2000 | Gain: ${bar}`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("[BAT] Garage")
                        .setValue("garagebuy")
                        .setDescription(`Prix: 3000 | Gain: ${garage}`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("[BAT] Magasin")
                        .setValue("magasinbuy")
                        .setDescription(`Prix: 4000 | Gain: ${magasin}`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("[BAT] Cinema")
                        .setValue("cinemabuy")
                        .setDescription(`Prix: 5000 | Gain: ${cinema}`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("[BAT] Gare")
                        .setValue("garebuy")
                        .setDescription(`Prix: 6500 | Gain: ${gare}`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("[BAT] Mairie")
                        .setValue("mairiebuy")
                        .setDescription(`Prix: 8000 | Gain: ${mairie}`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("[OTHER] anti-rob")
                        .setValue("antirobbuy")
                        .setDescription(`Protège des vols & commandes métier`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("[OTHER] wagon")
                        .setValue("wagonbuy")
                        .setDescription(`Donne accès aux commande "mine" et "wagon"`),
                )

    const msg = await message.channel.send({ embeds: [shopEmbed], components: [new Discord.ActionRowBuilder().addComponents([MenuSelection])] })

        let filter1 = (i) => i.user.id === message.author.id;


            const collector = msg.createMessageComponentCollector({
                filter: filter1,
              });
              
              collector.on('collect', async (interaction) => {
                interaction.deferUpdate()
                if (interaction.values[0] === 'barbuy') {
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const userCoins = req[0].coins
                        const noenoughmoney = new Discord.EmbedBuilder()
                        .setDescription(`:x: Vous avez besoin de 2000 pour acheter le bâtiment **bar**`)
                        .setColor(color)
                        if(Number(userCoins) < 2000) return message.reply({ embeds: [noenoughmoney]})

                         bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                            const bat = req[0].bar
                            if(bat == "yes") return message.reply(`:x: Vous avez déjà le bâtiment **bar**`)
                            if(bat !== "yes") {
                                const buysucess = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`:white_check_mark: Vous avez acheté **bar** pour \`2000 coins\``)

                                const finalmoney = Number(userCoins) - 2000

                                bot.db.query(`UPDATE user SET coins = '${finalmoney}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                bot.db.query(`UPDATE batiment SET bar = 'yes' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                message.reply({ embeds: [buysucess] })
                            } 

                         })

                    })

                }

                if (interaction.values[0] === 'garagebuy') {
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const userCoins = req[0].coins
                        const noenoughmoney = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setDescription(`:x: Vous avez besoin de 3000 pour acheter le bâtiment **garage**`)
                        if(Number(userCoins) < 3000) return message.reply({ embeds: [noenoughmoney]})

                         bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                            const bat = req[0].garage
                            if(bat == "yes") return message.reply(`:x: Vous avez déjà le bâtiment **garage**`)
                            if(bat !== "yes") {
                                const buysucess = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`:white_check_mark: Vous avez acheté **garage** pour \`3000 coins\``)

                                const finalmoney = Number(userCoins) - 3000

                                bot.db.query(`UPDATE user SET coins = '${finalmoney}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                bot.db.query(`UPDATE batiment SET garage = 'yes' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                message.reply({ embeds: [buysucess] })
                            } 

                         })

                    })

                }

                if (interaction.values[0] === 'magasinbuy') {
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const userCoins = req[0].coins
                        const noenoughmoney = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setDescription(`:x: Vous avez besoin de 4000 pour acheter le bâtiment **magasin**`)
                        if(Number(userCoins) < 4000) return message.reply({ embeds: [noenoughmoney]})

                         bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                            const bat = req[0].magasin
                            if(bat == "yes") return message.reply(`:x: Vous avez déjà le bâtiment **magasin**`)
                            if(bat !== "yes") {
                                const buysucess = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`:white_check_mark: Vous avez acheté **magasin** pour \`4000 coins\``)

                                const finalmoney = Number(userCoins) - 4000

                                bot.db.query(`UPDATE user SET coins = '${finalmoney}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                bot.db.query(`UPDATE batiment SET magasin = 'yes' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                message.reply({ embeds: [buysucess] })
                            } 

                         })

                    })

                }

                if (interaction.values[0] === 'cinemabuy') {
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const userCoins = req[0].coins
                        const noenoughmoney = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setDescription(`:x: Vous avez besoin de 5000 pour acheter le bâtiment **cinema**`)
                        if(Number(userCoins) < 5000) return message.reply({ embeds: [noenoughmoney]})

                         bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                            const bat = req[0].cinema
                            if(bat == "yes") return message.reply(`:x: Vous avez déjà le bâtiment **cinema**`)
                            if(bat !== "yes") {
                                const buysucess = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`:white_check_mark: Vous avez acheté **cinema** pour \`5000 coins\``)

                                const finalmoney = Number(userCoins) - 5000

                                bot.db.query(`UPDATE user SET coins = '${finalmoney}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                bot.db.query(`UPDATE batiment SET cinema = 'yes' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                message.reply({ embeds: [buysucess] })
                            } 

                         })

                    })

                }

                if (interaction.values[0] === 'garebuy') {
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const userCoins = req[0].coins
                        const noenoughmoney = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setDescription(`:x: Vous avez besoin de 6500 pour acheter le bâtiment **gare**`)
                        if(Number(userCoins) < 6500) return message.reply({ embeds: [noenoughmoney]})

                         bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                            const bat = req[0].gare
                            if(bat == "yes") return message.reply(`:x: Vous avez déjà le bâtiment **gare**`)
                            if(bat !== "yes") {
                                const buysucess = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`:white_check_mark: Vous avez acheté **gare** pour \`6500 coins\``)

                                const finalmoney = Number(userCoins) - 6500

                                bot.db.query(`UPDATE user SET coins = '${finalmoney}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                bot.db.query(`UPDATE batiment SET gare = 'yes' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                message.reply({ embeds: [buysucess] })
                            } 

                         })

                    })

                }

                if (interaction.values[0] === 'mairiebuy') {
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const userCoins = req[0].coins
                        const noenoughmoney = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setDescription(`:x: Vous avez besoin de 8000 pour acheter le bâtiment **mairie**`)
                        if(Number(userCoins) < 8000) return message.reply({ embeds: [noenoughmoney]})

                         bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                            const bat = req[0].mairie
                            if(bat == "yes") return message.reply(`:x: Vous avez déjà le bâtiment **mairie**`)
                            if(bat !== "yes") {
                                const buysucess = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`:white_check_mark: Vous avez acheté **mairie** pour \`8000 coins\``)

                                const finalmoney = Number(userCoins) - 8000

                                bot.db.query(`UPDATE user SET coins = '${finalmoney}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                bot.db.query(`UPDATE batiment SET mairie = 'yes' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                message.reply({ embeds: [buysucess] })
                            } 

                         })

                    })

                }

                if (interaction.values[0] === 'antirobbuy') {
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const userCoins = req[0].coins
                        const noenoughmoney = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setDescription(`:x: Vous avez besoin de 1000 pour acheter un& **anti rob**`)
                        if(Number(userCoins) < 1000) return message.reply({ embeds: [noenoughmoney]})

                                const buysucess = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`:white_check_mark: Vous avez acheté un **anti-rob**, vous avez 2 heure(s), 0 minute(s) d'anti-rob !`)

                                const finalmoney = Number(userCoins) - 1000

                                bot.antirob.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

                                bot.db.query(`UPDATE user SET coins = '${finalmoney}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                message.reply({ embeds: [buysucess] })

                    })

                }

                if (interaction.values[0] === 'wagonbuy') {
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const userCoins = req[0].coins
                        const noenoughmoney = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setDescription(`:x: Vous avez besoin de 1500 pour acheter un **wagon**`)
                        if(Number(userCoins) < 1500) return message.reply({ embeds: [noenoughmoney]})

                        bot.db.query(`SELECT * FROM mine WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                            const wagon = req[0].wagon
                            const miner = Number(wagon) + 10

                                const buysucess = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`:white_check_mark: Vous avez acheté un wagon pour 1500 coins !\nVous pouvez maintenant miner ${miner} fois avant de devoir en racheter un !`)

                                const finalmoney = Number(userCoins) - 1500
                                let wagonMine = 10;

                                bot.db.query(`UPDATE mine SET wagon = '${miner}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                bot.db.query(`UPDATE user SET coins = '${finalmoney}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                message.reply({ embeds: [buysucess] })
                        })

                    })

                }

              })

            })

}