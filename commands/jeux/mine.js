const Discord = require("discord.js");

exports.help = {
  name: "mine",
  category: "jeux",
  aliases: [],
  description: "Mine des minerais",
  usage: "Pas d'utilisation conseillée"
};
const cooldownTime = 1 * 60 * 60; //met 1 * 0 * 0

const cooldownsmine = new Map();

exports.run = async (bot, message, args, color) => {
  bot.db.query(`SELECT * FROM mine WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
    const wagon = req[0].wagon;
    if (wagon == "0") {
      const slutembed = new Discord.EmbedBuilder()
        .setDescription(":x: Vous devez acheter un wagon avant de pouvoir utiliser cette commande !\nExemple: `buy wagon`")
        .setFooter(bot.footer)
        .setColor(color)

      message.reply({ embeds: [slutembed] });
    } else {

        if (cooldownsmine.has(message.author.id + message.guild.id)) {
                    const cooldownExpiration = cooldownsmine.get(message.author.id + message.guild.id) + cooldownTime;
                    const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

                    if (remainingCooldown > 0) {
                        const hours = Math.floor(remainingCooldown / 3600);
                        const minutes = Math.floor((remainingCooldown % 3600) / 60);
                        const seconds = Math.floor(remainingCooldown % 60);

                        const CouldownEmbed = new Discord.EmbedBuilder()
                        .setDescription(`:x: Vous avez déjà miné récemment\n\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes\nUtilisez la commande \`wagon\` pour vendre vos minerais\n**__Inventaire:__**\n**Charbon:** ${req[0].charbon}\n**Fer:** ${req[0].fer}\n**Or:** ${req[0].ors}\n**Diamant:** ${req[0].diamant}`)
                        .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1127265483440275558/pioche-removebg-preview.png?width=900&height=900`)
                        .setFooter(bot.footer)
                        .setColor(color)


                        return message.reply({ embeds: [CouldownEmbed] });
                    }
                }

      const rates = {
        diamant: 0.05,
        or: 0.15,
        fer: 0.35,
        charbon: 0.45
      };

      const material = getRandomMaterial(rates);
      const maxMaterialsFound = 5; 
      const maxMaterialCount = {
        diamant: 1,
        or: 2,
        fer: 3,
        charbon: 5
      };

      if (material) {
        const materialCount = getRandomInt(1, maxMaterialsFound);
        const limitedMaterialCount = Math.min(materialCount, maxMaterialCount[material]);

        bot.db.query(`UPDATE mine SET wagon = '${Number(wagon) - 1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`) // Pk ici tu delete le wagon ? il va return 0 la 
       // je le delte pas je l'update ta compris fin l'user il pourra plus l'use si il return 0 ??? bah il en a 10 max par exemple quand il a 
       //utilisé les 10 il ne peut plus regarde ligne 17 j'avais pas vu dans le buy t'ajoutais 10 instant oe
        if(material == 'or') {
        bot.db.query(`UPDATE mine SET ors = '${Number(req[0].ors) + Number(limitedMaterialCount)}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        } else if (material == 'fer') {
            bot.db.query(`UPDATE mine SET fer = '${Number(req[0].fer) + Number(limitedMaterialCount)}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        } else if (material == 'charbon') {
            bot.db.query(`UPDATE mine SET charbon = '${Number(req[0].charbon) + Number(limitedMaterialCount)}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        } else if (material == 'diamant') {
            bot.db.query(`UPDATE mine SET diamant = '${Number(req[0].diamant) + Number(limitedMaterialCount)}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        }
        const embed = new Discord.EmbedBuilder()
          .setDescription(`:pick: ${message.author.username}, Vous venez de gagner \`${limitedMaterialCount} ${material}(s)\`\nUtilisez la commande \`wagon\` pour vendre vos minerais !`)
          .setThumbnail(`https://media.discordapp.net/attachments/1121718489829347358/1127265483440275558/pioche-removebg-preview.png?width=900&height=900`)
          .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
          .setColor(color)
        cooldownsmine.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));
        message.reply({ embeds: [embed] });
      } else {
        const embed = new Discord.EmbedBuilder()
          .setDescription("Vous avez trouvé aucun matériau, mais vous avez obtenu de la poussière.")
          .setColor("#FF0000")
          .setFooter(bot.footer)
          .setColor(color)

        message.reply({ embeds: [embed] });
      }
    }
  });
};

function getRandomMaterial(rates) {
  const totalRate = Object.values(rates).reduce((total, rate) => total + rate, 0);
  const random = Math.random() * totalRate;

  let cumulativeRate = 0;
  for (const material in rates) {
    cumulativeRate += rates[material];
    if (random <= cumulativeRate) {
      return material;
    }
  }

  return null;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
