const Discord = require("discord.js")

const cooldownTime = 3 * 60 * 60;

const cooldownsReputation = new Map();

exports.help = {
    name: "rep",
    category: "gestioncoins",
    aliases: ["reputation", "vote", "trep"],
    description: "Vote pour un joueur",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let mention;
    let reputation;

    if (cooldownsReputation.has(message.author.id + message.guild.id)) {
        const cooldownExpiration = cooldownsReputation.get(message.author.id + message.guild.id) + cooldownTime;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`:x: Vous avez déjà rep quelqu'un\n\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)


            return message.reply({ embeds: [CouldownEmbed] });
        }
    }
    


    if(!args[0]) return message.reply(`:x: \`ERROR:\` Veuillez mentionner un membre ou préciser l'ID d'une team !`)
    if(message.mentions.members.first() || message.guild.members.cache.get(args[0])) {
        mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(mention.id == message.author.id) return message.reply(`:x: Vous ne pouvez pas voter pour vous-même !`)

         bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Cette utilisateur n\'a pas encore commencer les coins dîtes lui d\'envoyer un message !')
        
        reputation = Number(req[0].reputation) + 1

        bot.db.query(`UPDATE user SET reputation = '${reputation}' WHERE guildId = '${message.guild.id}' AND userId = '${mention.id}'`)

        cooldownsReputation.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));
        
        message.channel.send(`:small_red_triangle: <@${mention.id}> vient de gagner \`1 réputation\``)

      })
    } else {
        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${args[0]}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Cette team n\'existe pas !')

        const reputFinal = req[0].reputation
        reputation = Number(reputFinal) + 1
        
        bot.db.query(`UPDATE team SET reputation = '${reputation}' WHERE guildId = '${message.guild.id}' AND id = '${args[0]}'`)
        if(req[0].avatar == "no" && reputation == "10") {
            bot.db.query(`UPDATE team SET avatar = 'yes' WHERE guildId = '${message.guild.id}' AND id = '${args[0]}'`)
        } else if (req[0].banner == "no" && reputation == "20") {
            bot.db.query(`UPDATE team SET banner = 'yes' WHERE guildId = '${message.guild.id}' AND id = '${args[0]}'`)
        }

        cooldownsReputation.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

        message.channel.send(`:small_red_triangle: La team \`${req[0].nom}\` vient de gagner \`1 réputation\``)

        })
    } 

}
