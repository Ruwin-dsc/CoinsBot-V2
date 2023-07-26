const Discord = require("discord.js")

exports.help = {
    name: "tleave",
    category: "team",
    aliases: ["t-leave"],
    description: "Permet de quitter votre team actuelle",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const teamid = req[0].team
        if(teamid == 'no') return message.reply(`:x: Vous n'appartenez à aucune team !`)
        bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                bot.db.query(`DELETE FROM tmembers WHERE guildId = ${message.guild.id} AND userId = ${message.author.id}`);
                bot.db.query(`UPDATE user SET team = "no" WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`); 
                bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
                const leaveEmbed = new Discord.EmbedBuilder()
                .setTitle(`${message.author.username} vient de quitter la team ${req[0].nom}`)
                .setDescription(`Il peut désormais rejoindre une nouvelle team !`)
                message.reply({ embeds: [leaveEmbed] })
                })
        })
    })

}
