const Discord = require("discord.js")

const cooldownTime = 1 * 60 * 60;
const cooldownTime2 = 2 * 60 * 60;

const cooldownsRob = new Map(); 

exports.help = {
    name: "rob",
    category: "jeux",
    aliases: [],
    description: "Vole l'argent de la main d'un autre joueur",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsuser; 
    let coinsauthor;

        if (cooldownsRob.has(message.author.id + message.guild.id)) {
        const cooldownExpiration = cooldownsRob.get(message.author.id + message.guild.id) + cooldownTime;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez déjà rob quelqu'un\n\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
            .setFooter(bot.footer)
            .setColor(color)


            return message.reply({ embeds: [CouldownEmbed] });
        }
    }

    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!mention) return message.channel.send(`:x: \`ERROR:\` Pas de membre trouvé !`)
    const memeEmbed = new Discord.EmbedBuilder()
    .setDescription(`:x: Vous ne pouvez pas vous rob vous-même !`)
    .setFooter(bot.footer)
    .setColor(color)
    if(mention.id == message.author.id) return message.reply({ embeds: [memeEmbed]})

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer les coins refaîtes la commande !')
        coinsauthor = Number(req[0].coins)
    })

    if (bot.antirob.has(mention.id + message.guild.id)) {
        const cooldownExpiration = bot.antirob.get(mention.id + message.guild.id) + cooldownTime2;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`:shield: Vous ne pouvez pas rob cet utilisateur\n\nSon anti-rob prendra fin dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
            .setFooter(bot.footer)
            .setColor(color)


            return message.reply({ embeds: [CouldownEmbed] });
        }
    }

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Cette utilisateur n\'a pas encore commencer les coins dîtes lui d\'envoyer un message !')
        const coins = Number(req[0].coins)
        const pasdeCoinEmbed = new Discord.EmbedBuilder()
        .setDescription(`:x: ${mention.username} n'a pas d'argent à voler !`)
        .setFooter(bot.footer)
        .setColor(color)
        if(coins < 0) return message.reply({ embeds: [pasdeCoinEmbed] })


        if (Math.random() < 2 / 3) {
            const rob = Math.floor(Math.random() * (Number(coins) - 0 + 1)) + 0;
            coinsuser = Number(coins) - Number(rob)
            coinsauthor = Number(coinsauthor) + Number(rob)

             bot.db.query(`UPDATE user SET coins = '${coinsauthor}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
             bot.db.query(`UPDATE user SET coins = '${coinsuser}' WHERE guildId = '${message.guild.id}' AND userId = '${mention.id}'`)
            cooldownsRob.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));
            const robSucess = new Discord.EmbedBuilder()
            .setDescription(`:white_check_mark: Vous avez volé ${mention} et repartez avec \`${rob} coins\` en plus`)
            .setFooter(bot.footer)
            .setColor(color)
            message.reply({ embeds: [robSucess] })
        } else {
        const norob = new Discord.EmbedBuilder()
        .setDescription(`Vous n'avez pas réussi à rob ${mention.user.username} !`)
        .setFooter(bot.footer)
        .setColor(color)

        message.reply({ embeds: [norob] })
    }
    })

}