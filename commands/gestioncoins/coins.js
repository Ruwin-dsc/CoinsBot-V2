const Discord = require("discord.js")

exports.help = {
    name: "coins",
    category: "gestioncoins",
    aliases: ["balance", "money", "bank", "coin", "bal"],
    description: "Affiche les coins du membre mentionné ou de l'auteur du message",
    usage: "coins [@user]"
}

exports.run = async (bot, message, args, color) => {
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply({ content: `:x: Cette utilisateur ne joue pas aux coins` })

        const coinsEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: mention.user.username, iconURL: mention.user.displayAvatarURL({ dynamic: true }), url: 'https://discord.gg/zcN3sB5KSv' })
        .setDescription(`**${mention.user.username}** a\n:coin: **${req[0].coins}** coins en poche\n:bank: **${req[0].banque}** coins en banque\n:small_red_triangle: **${req[0].reputation}** point de réputation`)
        .setFooter({ text: `♥ CoinsBot by WhiteHall`})
        .setColor(color)

        message.reply({ embeds: [coinsEmbed] })

    })
}
