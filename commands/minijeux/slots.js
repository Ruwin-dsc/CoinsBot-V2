const Discord = require("discord.js");
const fruits = ["🍓", "🍇", "🍏", "🍊", "🍒"]

exports.help = {
  name: "slots",
  category: "jeux", 
  aliases: ["slot"],
  description: "Lance un slots",
  usage: "Pas d'utilisation conseillée"
};

exports.run = async (bot, message, args, color) => {
    let fruit11, fruit22, fruit33, numbercoins
    const embedNoArgs = new Discord.EmbedBuilder()
    .setColor(color)
    .setDescription(`:x: Précisez un montant à miser | slots <amount/all>`)
    if(!args[0]) return message.channel.send({ embeds: [embedNoArgs] })

    const embedpasassez = new Discord.EmbedBuilder()
    .setDescription(`:x: Vous n'avez pas assez de coins !`)
    .setColor(color)
    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const coins = req[0].coins
        if(args[0] !== "all") {
        if(isNaN(args[0])) return message.channel.send(`:x: Ceci n'est pas un chiffre valide !`)
        if(Number(args [0]) <= 0) return message.channel.send(`:x: Ceci n'est pas un chiffre valide !`)
        if(Number(coins) < Number(args[0])) return message.channel.send({ embeds: [embedpasassez] })
        numbercoins = args[0]
        } else if(args[0] == "all") {
            if(Number(coins) <= 0) return message.channel.send({ embeds: [embedpasassez] })
            numbercoins = coins
        } else {
            return message.channel.send({ embeds: [embedNoArgs] })
        }

        const slotEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${fruitrandom()} | ${fruitrandom()} | ${fruitrandom()}` })
        .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1134406693216850042/tenor.gif?width=484&height=272`)
        .setDescription(`${message.author.username} vient de lancer un **slots** en misant \`${numbercoins} coins\` !`)
        .setColor(color)
        .setFooter({ text: `${message.author.username} | 10 secondes avant le résultat`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

        const msg = await message.channel.send({ embeds: [slotEmbed] })
        let count = 0;

        const interval = setInterval(() => {
        count++;

            const fruit1 = fruitrandom();
            const fruit2 = fruitrandom();
            const fruit3 = fruitrandom();

            slotEmbed.setAuthor({ name: `${fruit1} | ${fruit2} | ${fruit3}` })

            msg.edit({ embeds: [slotEmbed] })

             if (count >= 5) {
                clearInterval(interval);

                setTimeout(() => {
                    fruit11 = fruitrandom();
                    fruit22 = fruitrandom();
                    fruit33 = fruitrandom();

                    if (fruit11 === fruit22 && fruit22 === fruit33) {
                    const slotEmbed2 = new Discord.EmbedBuilder()
                    .setAuthor({ name: `${fruit11} | ${fruit22} | ${fruit33}` })
                    .setDescription(`Vous avez gagné \`${Number(numbercoins) * 4} coins\``)
                    .setColor(color)
                    .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

                    message.reply({ embeds: [slotEmbed2] })

                    bot.db.query(`UPDATE user SET coins = coins + ${Number(numbercoins) * 3} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);

                    } else if (fruit11 === fruit22 || fruit11 === fruit33 || fruit22 === fruit33) {
                    const slotEmbed2 = new Discord.EmbedBuilder()
                    .setAuthor({ name: `${fruit11} | ${fruit22} | ${fruit33}` })
                    .setDescription(`Vous avez gagné \`${Math.floor(Number(numbercoins) * 2)} coins\``)
                    .setColor(color)
                    .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

                    message.reply({ embeds: [slotEmbed2] })
                    bot.db.query(`UPDATE user SET coins = coins + ${Number(numbercoins)} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);
                    } else {
                    const slotEmbed2 = new Discord.EmbedBuilder()
                    .setAuthor({ name: `${fruit11} | ${fruit22} | ${fruit33}` })
                    .setDescription(`Vous avez perdu \`${Number(numbercoins)} coins\``)
                    .setColor(color)
                    .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

                    message.reply({ embeds: [slotEmbed2] })

                    bot.db.query(`UPDATE user SET coins = coins - ${Number(numbercoins)} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);
                    }
                }, 2000)

             }

        }, 2000)
    })
}


function fruitrandom() {
  const number = Math.floor(Math.random() * fruits.length);
  return fruits[number];
}
