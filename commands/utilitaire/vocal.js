const Discord = require("discord.js")

exports.help = {
    name: "vocal",
    category: "gestioncoins",
    aliases: [],
    description: "Vous empêches de recevoir des coins en vocal (pour éviter le ping des rob ;) )",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const vocalactivate = req[0].vocal
        if(vocalactivate == "on") {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`:no_entry: Vous ne recevrez plus de coins lorsque vous êtes en vocal, refaite la commande \`vocal\` pour réactiver le gain !`)
            .setColor(color)

            bot.db.query(`UPDATE user SET vocal = 'off' WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);

            message.reply({ embeds: [embed] })
        }
        if(vocalactivate == "off") {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`:ballot_box_with_check: Vous recevrez désormais les coins en vocal !`)
            .setColor(color)

            bot.db.query(`UPDATE user SET vocal = 'on' WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);

            message.reply({ embeds: [embed] })
        }
    })
}