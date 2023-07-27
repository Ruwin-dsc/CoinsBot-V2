const Discord = require("discord.js");

module.exports = {
  name: "ready",
  async execute(bot) {
  setInterval(() => {
    bot.guilds.cache.forEach((guild) => {
      
        bot.db.query(`SELECT * FROM team WHERE guildId = "${guild.id}"`, async (err, req) => {

            for (const result of req) {
                const teamId = result.id
                const teamname = result.nom

                bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${guild.id}" AND teamId = "${teamId}"`, async (err, req) => {
                    const number = req.length
                    if(number == 0) {
                        bot.db.query(`DELETE FROM team WHERE guildId = ${guild.id} AND id = ${teamId}`);
                    }
                    const impots = Number(number) * 60

                    bot.db.query(`UPDATE team SET coins = coins - ${Number(impots)} WHERE guildId = "${guild.id}" AND id = "${teamId}"`);
                    bot.db.query(`SELECT * FROM logs WHERE guildId = "${guild.id}"`, async (err, req) => {
                        const team = req[0].logsimpots
                        if(!logsimpots) return 
                        if(team == null) return
                        const teamsalon = bot.channels.cache.get(team);
                        if(!teamsalon) return
                        const embedLogs = new Discord.EmbedBuilder()
                        .setAuthor({ name: `${teamname}`, url: 'https://discord.gg/zcN3sB5KSv' })
                        .setDescription(`La team ${teamname} vient de payer \`${impots} coins\` d'impôt pour héberger ses ${number} membres !`)
                        .setTimestamp()
                        .setColor(`Blue`)
            
                        teamsalon.send({ embeds: [embedLogs] })
            
                      })



                })


            }
        })
    });
  }, 24 * 60 * 60 * 1000); 
}};
