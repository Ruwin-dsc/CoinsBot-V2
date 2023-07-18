const Discord = require("discord.js")

exports.help = {
    name: "recolt",
    category: "illegal",
    aliases: ["drugs", "rt"],
    description: "Récolte la drogue",
    usage: "Pas d'utilisation conseillée"
}

const cooldownsrecolt = new Map();
const cooldownTimerecolt = 3 * 60 * 60;

exports.run = async (bot, message, args, color) => {

    message.delete()

    if (cooldownsrecolt.has(message.author.id + message.guild.id)) {
                    const cooldownExpiration = cooldownsrecolt.get(message.author.id + message.guild.id) + cooldownTimerecolt;
                    const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

                    if (remainingCooldown > 0) {
                        const hours = Math.floor(remainingCooldown / 3600);
                        const minutes = Math.floor((remainingCooldown % 3600) / 60);
                        const seconds = Math.floor(remainingCooldown % 60);
                        return 
                    }
                }

    bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {

    const nohacker = new Discord.EmbedBuilder()
        .setDescription(`:x: Vous devez avoir la capacité **cultivateur** pour utiliser cette commande !`)
        .setColor(color)
        .setFooter({ text: `Commande Anonyme` })
    if(req[0].cultivateur == "no") return message.channel.send({ embeds: [nohacker], ephemeral: true })

    const pill = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

    const EmbedBuilder = new Discord.EmbedBuilder()
    .setDescription(`:pill: Un joueur vient de récolter \`${pill} 💊\``)
    .setColor(color)
    .setFooter({ text: `Commande Anonyme`})
    

    bot.db.query(`UPDATE user SET pill = pill + ${pill} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);

    cooldownsrecolt.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

    message.channel.send({ embeds: [EmbedBuilder] })
    })

}