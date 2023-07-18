const Discord = require("discord.js")

exports.help = {
    name: "ttop",
    category: "team",
    aliases: ["top-team", "t-top", "team-top"],
    description: "Pas de description renseignée.",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
  let count = 1


     bot.db.query(`SELECT * FROM team ORDER BY coins DESC LIMIT 10`, async (err, req) => {
     let leaderboardDescription = ""
      req.forEach((row, index) => {
        const id = row.id;
        const coins = row.coins;
        const newusername = row.nom
        if(Number(coins !== 0)) {
        leaderboardDescription += `${count}) **${newusername}** (id: ${id})\n\`${coins} coins\`\n`;
        count = Number(count) + 1
        }
      });

      if(leaderboardDescription = " ") leaderboardDescription = "Aucune team dans le classement !"

      const lbCoins = new Discord.EmbedBuilder()
        .setAuthor({ name: `Leaderboard des teams sur ${message.guild.name}`, iconURL: `https://images-ext-2.discordapp.net/external/Db_tN_Y54YNEZmqAFsDmqIqQT0PwwNIiJCWGac69E-o/https/images.emojiterra.com/twitter/v13.0/512px/1fa99.png`, url: 'https://discord.gg/zcN3sB5KSv' })
        .setDescription(leaderboardDescription)
        .setFooter({ text: `♥ CoinsBot remade by WhiteHall`})
        .setColor(color)

       

        const menumsg = await message.channel.send({ embeds: [lbCoins] })

       


     })
    



}