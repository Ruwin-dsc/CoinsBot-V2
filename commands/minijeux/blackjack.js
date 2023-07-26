const Discord = require("discord.js");
const blackjack = require('whitehall')

exports.help = {
  name: "blackjack",
  category: "jeux", 
  aliases: ["bj"],
  description: "Lance un blackjack",
  usage: "blackjack <amount>"
};

exports.run = async (bot, message, args, color) => {

    const noargs = new Discord.EmbedBuilder()
    .setDescription(`:x: Précisez un montant valide à miser | blackjack <amount/all>`)
    .setColor(color)

    const pasassez = new Discord.EmbedBuilder()
    .setDescription(`:x: Vous n'avez pas assez !`)
    .setColor(color)

    if(!args[0]) return message.reply({ embeds: [noargs] })
    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const coins = req[0].coins

    if(args[0] == "all") {
        if(Number(coins) <= 0) return message.reply({ embeds: [pasassez] })
    let embed = {
            title: "BlackJack 🎲",
            fields: [
                { name: `Votre main`, value: "", inline: true },
                { name: `‎`, value: "‎", inline: true },
                { name: `Main de ${bot.user.username}`, value: "", inline: true }
            ],
            footer: { text: `${message.author.username}, si vous abandonnez la partie, seulement 50% de vos coins vous seront remboursés !`}
        }
  
        const game = await blackjack(message, {resultEmbed: false, normalEmbed: false, normalEmbedContent: embed});


        switch (game.result)
        {
            case 'WIN': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);
                const newcoins = coins * 2
                const embed = new Discord.EmbedBuilder()
                .setTitle(`Vous avez gagné !`)
                .setDescription(`Vous avez un total de ${ycard} et moi ${dcard} points !\n:coin: Vous venez de gagner \`${newcoins} coins\``)
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = '${newcoins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'LOSE': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Vous avez perdu !`)
                .setDescription(`Vous avez un total de ${ycard} et moi ${dcard} points !\n:coin: Vous venez de perdre \`${coins} coins\``)
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = coins - coins WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'TIE': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Egalité !`)
                .setDescription(`Nous avons tout les deux ${ycard} points !`)
                .setColor(color)

                message.reply({ embeds: [embed] });
                return
            }

            case 'DOUBLE WIN': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const newcoins = coins * 4

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Double victoire !`)
                .setDescription(`Vous avez un total de ${ycard} et moi ${dcard} points !\n:coin: Vous venez de gagner \`${newcoins} coins\``)
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = '${newcoins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'DOUBLE LOSE': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const newcoins = Number(coins) - Number(coins) * 2

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Double défaite !`)
                .setDescription(`Vous avez un total de ${ycard} et moi ${dcard} points !\n:coin: Vous venez de perdre \`${newcoins} coins\``)
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = '${newcoins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'DOUBLE TIE': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Double égalité !`)
                .setDescription(`Nous avons tout les deux ${ycard} points !`)
                .setColor(color)

                message.reply({ embeds: [embed] });
                return
            }

            case 'CANCEL': {
                const embed = new Discord.EmbedBuilder()
                .setTitle(`Abandon !`)
                .setDescription(`Vous avez abandonné ! La moitié de vos coins vous ont été remboursés !`)
                .setColor(color)

                const newcoins = Math.floor(coins / 2)

                bot.db.query(`UPDATE user SET coins = '${newcoins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'TIMEOUT': {
                const embed = new Discord.EmbedBuilder()
                .setTitle(`Temps écoulé !`)
                .setDescription(`Temps écoulé ! 50% de vos coins ont été remboursés !`)
                .setColor(color)

                const newcoins = Math.floor(coins / 2)

                bot.db.query(`UPDATE user SET coins = '${newcoins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
        }
    }

    } else if(Number(args[0])) {
                if(Number(coins) <= 0) return message.reply({ embeds: [noargs] })

                if(Number(coins) < Number(args[0])) return message.reply({ embeds: [pasassez] })
    let embed = {
            title: "BlackJack 🎲",
            fields: [
                { name: `Votre main`, value: "", inline: true },
                { name: `‎`, value: "‎", inline: true },
                { name: `Main de ${bot.user.username}`, value: "", inline: true }
            ],
            footer: { text: `${message.author.username}, si vous abandonnez la partie, seulement 50% de vos coins vous seront remboursés !`}
        }
  
        const game = await blackjack(message, {resultEmbed: false, normalEmbed: false, normalEmbedContent: embed});


        switch (game.result)
        {
            case 'WIN': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);
                const newcoins = Number(args[0]) * 2
                const embed = new Discord.EmbedBuilder()
                .setTitle(`Vous avez gagné !`)
                .setDescription(`Vous avez un total de ${ycard} et moi ${dcard} points !\n:coin: Vous venez de gagner \`${newcoins} coins\``)
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = coins + ${args[0]} WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'LOSE': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Vous avez perdu !`)
                .setDescription(`Vous avez un total de ${ycard} et moi ${dcard} points !\n:coin: Vous venez de perdre \`${args[0]} coins\``)
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = coins - ${args[0]} WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'TIE': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Egalité !`)
                .setDescription(`Nous avons tout les deux ${ycard} points !`)
                .setColor(color)

                message.reply({ embeds: [embed] });
                return
            }

            case 'DOUBLE WIN': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const newcoins = Number(args[0]) * 4

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Double victoire !`)
                .setDescription(`Vous avez un total de ${ycard} et moi ${dcard} points !\n:coin: Vous venez de gagner \`${newcoins} coins\``)
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = coins + ${args[0]} * 3 WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'DOUBLE LOSE': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const newcoins = Number(args[0]) * 2

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Double défaite !`)
                .setDescription(`Vous avez un total de ${ycard} et moi ${dcard} points !\n:coin: Vous venez de perdre \`${newcoins} coins\``)
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = coins - ${Number(args[0])} * 2 WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'DOUBLE TIE': {
                const ycard = game.ycard.map(card => card.value).reduce((a, b) => b + a);
                const dcard = game.dcard.map(c => c.value).reduce((a, b) => b + a);

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Double égalité !`)
                .setDescription(`Nous avons tout les deux ${ycard} points !`)
                .setColor(color)

                message.reply({ embeds: [embed] });
                return
            }

            case 'CANCEL': {
                const embed = new Discord.EmbedBuilder()
                .setTitle(`Abandon !`)
                .setDescription(`Vous avez abandonné ! La moitié de vos coins vous ont été remboursés !`)
                .setColor(color)

                const newcoins = Math.floor(args[0] / 2)

                bot.db.query(`UPDATE user SET coins = '${newcoins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
            }

            case 'TIMEOUT': {
                const embed = new Discord.EmbedBuilder()
                .setTitle(`Temps écoulé !`)
                .setDescription(`Temps écoulé ! 50% de vos coins ont été remboursés !`)
                .setColor(color)

                const newcoins = Math.floor(args[0] / 2)

                bot.db.query(`UPDATE user SET coins = '${newcoins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                message.reply({ embeds: [embed] });
                return
        }
    }

    } else {
        message.reply({ embeds: [noargs] })
    }
})
};
