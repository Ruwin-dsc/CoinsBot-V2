const Discord = require("discord.js")

const cooldownTime = 1 * 60 * 60;

const cooldownsWork = new Map();

exports.help = {
    name: "work",
    category: "jeux",
    aliases: ["wk"],
    description: "Fais gagner une somme de coins",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsUser;

    if (cooldownsWork.has(message.author.id)) {
        const cooldownExpiration = cooldownsWork.get(message.author.id) + cooldownTime;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez déjà work récemment\n\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
            .setFooter(bot.footer)
            .setColor(color)


            return message.reply({ embeds: [CouldownEmbed] });
        }
    }
    

        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')

        coinsUser = Number(req[0].coins)

        bot.db.query(`SELECT * FROM gain WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            const min = Number(req[0].workmin)
            const max = Number(req[0].workmax)

            const work = Math.floor(Math.random() * (max - min + 1)) + min;

            coinsUser = coinsUser + Number(work)

            bot.db.query(`UPDATE user SET coins = '${coinsUser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            const wkEmbed = new Discord.EmbedBuilder()
            .setDescription(`:coin: ${message.author.username}, Vous venez de gagner \`${work} coins\``)
            .setFooter(bot.footer)
            .setColor(color)

            cooldownsWork.set(message.author.id, Math.floor(Date.now() / 1000));

            message.reply({ embeds: [wkEmbed] })

        })      
       
      })

}