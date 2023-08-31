const Discord = require("discord.js")

exports.help = {
    name: "top",
    category: "gestioncoins",
    aliases: ["lb", "leaderboard"],
    description: "Affiche le leaderboard du serveur",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
     bot.db.query(`SELECT * FROM user WHERE guildId = '${message.guild.id}'`, async (err, req) => {
     let leaderboardDescription = ""
     let countcoins1 = 1
     const Ordre2 = req.sort((a, b) => b.coins - a.coins);
     for (const row of Ordre2.slice(0, 10)) {
      const userId = row.userId;
      const coins = row.coins;
      const user = await message.guild.members.cache.get(userId);
      if (user && coins !== "0") {
        leaderboardDescription += `${countcoins1}) ${user.user.username}\n\`${coins} coins\` :coin:\n`;
        countcoins1++;
      } 
    }
      const lbCoins = new Discord.EmbedBuilder()
        .setAuthor({ name: `Leaderboard des coins sur ${message.guild.name}`, iconURL: `https://images-ext-2.discordapp.net/external/Db_tN_Y54YNEZmqAFsDmqIqQT0PwwNIiJCWGac69E-o/https/images.emojiterra.com/twitter/v13.0/512px/1fa99.png`, url: 'https://discord.gg/zcN3sB5KSv' })
        .setDescription(leaderboardDescription || "Aucune données")
        .setFooter({ text: `♥ CoinsBot remade by WhiteHall`})
        .setColor(color)

        let menuoptions = new Discord.StringSelectMenuBuilder()
        .setCustomId('MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Faire une action")
        .addOptions(
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Top Poche`)
            .setDescription(`Affiche le leaderboard des membres avec de l'argent en main`)
            .setValue(`top_coins`),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Top Banque`)
            .setDescription(`Affiche le leaderboard des membres avec de l'argent en banque`)
            .setValue(`top_bank`),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Top Reputation`)
            .setDescription(`Affiche le leaderboard des points de réputations des membres`)
            .setValue(`top_rep`),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Top palier`)
            .setDescription(`Affiche le leaderboard des paliers des membres`)
            .setValue(`top_palier`),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`Top victoires`)
            .setDescription(`Affiche le leaderboard des victoires en duel`)
            .setValue(`top_victoires`),

        )

        const menumsg = await message.channel.send({ embeds: [lbCoins], components: [new Discord.ActionRowBuilder().addComponents([menuoptions])] })

        let msg = menumsg

        
        const col = await msg.createMessageComponentCollector({
        })

        col.on("collect", async (i) => {
            await i.deferUpdate()

            if (i.values[0] == "top_bank") {
              if(i.user.id !== message.author.id) return i.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true})
                 bot.db.query(`SELECT * FROM user`, async (err, req) => {
                  const Ordre = req.sort((a, b) => b.banque - a.banque);
     let leaderboardDescriptionBank = ""
     let countcoins = 1
     for (const row of Ordre.slice(0, 10)) {
      const userId = row.userId;
      const coins = row.banque;
      const user = await message.guild.members.cache.get(userId);
      if (user && coins !== "0") {
        leaderboardDescriptionBank += `${countcoins}) ${user.user.username}\n\`${coins} coins\` :coin:\n`;
        countcoins++;
      } 
    }

      const lbBank = new Discord.EmbedBuilder()
        .setAuthor({ name: `Leaderboard des coins en banque sur ${message.guild.name}`, iconURL: `https://images-ext-2.discordapp.net/external/dimTtGJ41YBkBAWgxAAvRax2OaAl27krgLKswvAFCF8/https/www.emoji.co.uk/files/mozilla-emojis/travel-places-mozilla/11821-bank.png`, url: 'https://discord.gg/zcN3sB5KSv' })
        .setDescription(leaderboardDescriptionBank || "Aucune données")
        .setFooter({ text: `♥ CoinsBot remade by WhiteHall`})
        .setColor(color)

        menumsg.edit({ embeds: [lbBank], components: [new Discord.ActionRowBuilder().addComponents([menuoptions])]})

    })
            }

            if (i.values[0] == "top_coins") {
              if(i.user.id !== message.author.id) return i.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true})
                 bot.db.query(`SELECT * FROM user`, async (err, req) => {
                  const Ordre = req.sort((a, b) => b.coins - a.coins);
     let leaderboardDescriptionCoins = ""
     let coinsCount = 1
     for (const row of Ordre.slice(0, 10)) {
      const userId = row.userId;
      const coins = row.coins;
      const user = await message.guild.members.cache.get(userId);
      if (user && coins !== "0") {
        leaderboardDescriptionCoins += `${coinsCount}) ${user.username}\n\`${coins} coins\` :coin:\n`;
        coinsCount++;
      } 
    }

      const lbCoins = new Discord.EmbedBuilder()
        .setAuthor({ name: `Leaderboard des coins sur ${message.guild.name}`, iconURL: `https://images-ext-2.discordapp.net/external/Db_tN_Y54YNEZmqAFsDmqIqQT0PwwNIiJCWGac69E-o/https/images.emojiterra.com/twitter/v13.0/512px/1fa99.png`, url: 'https://discord.gg/zcN3sB5KSv' })
        .setDescription(leaderboardDescriptionCoins || "Aucune données")
        .setFooter({ text: `♥ CoinsBot remade by WhiteHall`})
        .setColor(color)

        menumsg.edit({ embeds: [lbCoins], components: [new Discord.ActionRowBuilder().addComponents([menuoptions])]})

    })
            }

            if (i.values[0] == "top_rep") {
              if(i.user.id !== message.author.id) return i.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true})
                 bot.db.query(`SELECT * FROM user`, async (err, req) => {
                  const Ordre = req.sort((a, b) => b.reputation - a.reputation);
          let leaderboardDescriptionReputation = ""
          let repCount = 1
          for (const row of Ordre.slice(0, 10)) {
            const userId = row.userId;
            const coins = row.reputation;
            const user = await message.guild.members.cache.get(userId);
            if (user && coins !== "0") {
              leaderboardDescriptionReputation += `${repCount}) ${user.user.username}\n\`${coins} rep\` :small_red_triangle:\n`;
              repCount++;
            } 
          }

      const lbRep = new Discord.EmbedBuilder()
        .setAuthor({ name: `Leaderboard des réputations sur ${message.guild.name}`, iconURL: `https://images-ext-2.discordapp.net/external/dimTtGJ41YBkBAWgxAAvRax2OaAl27krgLKswvAFCF8/https/www.emoji.co.uk/files/mozilla-emojis/travel-places-mozilla/11821-bank.png`, url: 'https://discord.gg/zcN3sB5KSv' })
        .setDescription(leaderboardDescriptionReputation || "Aucune données")
        .setFooter({ text: `♥ CoinsBot remade by WhiteHall`})
        .setColor(color)

        menumsg.edit({ embeds: [lbRep], components: [new Discord.ActionRowBuilder().addComponents([menuoptions])]})

    })
            }

        })


     })
    
}
