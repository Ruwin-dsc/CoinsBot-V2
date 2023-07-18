const Discord = require("discord.js")

const cooldownTime = 12 * 60 * 60;

const cooldownsdaily = new Map();

exports.help = {
    name: "daily",
    category: "jeux",
    aliases: ["dy"],
    description: "Donne une grosse somme de coins chaque jour",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsUser;

    if (cooldownsdaily.has(message.author.id + message.guild.id)) {
        const cooldownExpiration = cooldownsdaily.get(message.author.id + message.guild.id) + cooldownTime;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez déjà reçu récompense journalière\n\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
            .setFooter(bot.footer)
            .setColor(color)


            return message.reply({ embeds: [CouldownEmbed] });
        }
    }
    

        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')

        coinsUser = Number(req[0].coins)

        bot.db.query(`SELECT * FROM gain WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            const min = Number(req[0].dailymin)
            const max = Number(req[0].dailymax)

            const daily = Math.floor(Math.random() * (max - min + 1)) + min;

            coinsUser = coinsUser + Number(daily)

            bot.db.query(`UPDATE user SET coins = '${coinsUser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            const wkEmbed = new Discord.EmbedBuilder()
            .setDescription(`:coin: Vous venez de gagner \`${daily} coins\`\nVous pourrez réutiliser cette commande dans 12 heures !`)
            .setFooter(bot.footer)
            .setColor(color)

            cooldownsdaily.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

            message.reply({ embeds: [wkEmbed] })

        })      
       
      })

}