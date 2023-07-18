const Discord = require("discord.js")

exports.help = {
    name: "owner",
    category: "administration",
    aliases: ["owner-add"],
    description: "Ajoute un membre aux owner",
    usage: "Pas d'utilisation conseillée",
    permission: "buyer"
}

exports.run = async (bot, message, args, color) => {
    if(!args[0]) {

         bot.db.query(`SELECT * FROM list2 WHERE guildId = "${message.guild.id}"`, async (err, owner) => {
          if (err) throw err;
      
          if (owner.length === 0) {
            const embed = new Discord.EmbedBuilder()
              .setTitle('Owner list')
              .setDescription('Aucun')
              .setColor(color)
              .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })});
      
            return message.channel.send({ embeds: [embed] });
          }
      
          const usersPerPage = 10;
          const totalPages = Math.ceil(owner.length / usersPerPage); 
      
          let page = 1;
          let startIndex = (page - 1) * usersPerPage;
          let endIndex = startIndex + usersPerPage;
          let usersToShow = owner.slice(startIndex, endIndex);
      
          const previousButton = new Discord.ButtonBuilder()
            .setCustomId('previous')
            .setLabel('Précédent')
            .setStyle(Discord.ButtonStyle.Primary);
      
          const nextButton = new Discord.ButtonBuilder()
            .setCustomId('next')
            .setLabel('Suivant')
            .setStyle(Discord.ButtonStyle.Primary);
      
          const buttonRow = new Discord.ActionRowBuilder().addComponents(previousButton, nextButton);
      
          const embed = new Discord.EmbedBuilder()
            .setTitle('Owner list')
            .setDescription(usersToShow.map(user => `<@${user.ownerId}>`).join('\n'))
            .setColor(color)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setTimestamp();
      
          const messageSent = await message.channel.send({ embeds: [embed], components: [buttonRow] });
      
          const filter = i => (i.customId === 'previous' || i.customId === 'next') && i.user.id === message.author.id;
          const collector = messageSent.createMessageComponentCollector({ filter });
      
          collector.on('collect', async interaction => {
            if (interaction.customId === 'previous') {
              page--;
            } else if (interaction.customId === 'next') {
              page++;
            }
      
            startIndex = (page - 1) * usersPerPage;
            endIndex = startIndex + usersPerPage;
            usersToShow = owner.slice(startIndex, endIndex);
      
            embed.setDescription(usersToShow.map(user => `<@${user.ownerId}>`).join('\n'));
            embed.setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })});
      
            await interaction.update({ embeds: [embed] });
          });
      
          collector.on('end', () => {
            buttonRow.components.forEach(component => component.setDisabled(true));
            messageSent.edit({ components: [buttonRow] });
          });
        });
      
        return;
    } else {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send('`❌` `ERROR:` Pas de membre trouvé !')
        bot.db.query(`SELECT * FROM list2 WHERE guildId = "${message.guild.id}" AND ownerId = "${user.id}"`, async (err, req) => {
            if (req.length < 1) {
                bot.db.query(`INSERT INTO list2 (guildId, ownerId) VALUES ("${message.guild.id}", "${user.id}")`);
                
                message.reply(`\`✅\` ${user.user.username} est maintenant owner du bot !`)
            } else {
                return message.channel.send("`❌` `ERROR:` Cette utilisateur est déjà owner du bot !")
            }
        })
    }

}