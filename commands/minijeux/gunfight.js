const Discord = require("discord.js")

exports.help = {
    name: "gunfight",
    category: "minijeux",
    aliases: ["gun", "gf"],
    description: "Lance une partie de GunFight",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinauthor, coinauthor2, coinsauthorfin, coinauthor2fin, remove1, remove2;

    const opponent = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!opponent) return message.reply(`:x: \`ERROR:\` Pas de membre trouvé !`)
    if(opponent.id == message.author.id) return message.channel.send(`Tu peux pas jouer avec toi même !`)
    const miseajouer = args[1]
    if(!miseajouer) return message.reply(`:x: Merci de préciser une somme à jouer !`)
    if(isNaN(miseajouer)) return message.reply(":x: Ceci n'est pas un chiffre valide !")
    if(Number(miseajouer) <= 0) return message.reply(":x: Ceci n'est pas un chiffre valide !")

    const nomoney = new Discord.EmbedBuilder()
    .setDescription(`:x: Vous n'avez pas assez !`)
    .setColor(color)

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencer refaîtes la commande !')
        coinauthor = req[0].coins

        if(Number(coinauthor) < Number(args[1])) {
            return message.reply({ embeds: [nomoney] })
        } else {
            
                bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${opponent.id}"`, async (err, req) => {
        if(req.length < 1) return message.reply(':x: Cette utilisateur n\'a pas encore commencer les coins dîtes lui d\'envoyer un message !')
        coinauthor2 = req[0].coins

        if(Number(coinauthor2) < Number(args[1])) {
            return message.reply(`:x: **${opponent.username} n'a pas assez de coins pour jouer avec vous !** Il doit avoir en main la somme misée pour jouer !`)
        } else {
            const accept = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji(`\✅`)
                .setCustomId("acceptgunfight")
                .setStyle(Discord.ButtonStyle.Success),
            )
            const msg = await message.reply({ content: `:question: ${opponent} acceptes-tu le duel de **Gun** avec une mise de ${args[1]} coins contre ${message.author} ?\n\n_Tu as 30 secondes pour accepter_`, components: [accept] })

            const collector2 = msg.createMessageComponentCollector({
                time: 30000
            });

    collector2.on('collect', async (interaction) => {
            if (interaction.customId === 'acceptgunfight') {
                coinsauthorfin = Number(coinauthor) + Number(args[1])
                coinauthor2fin = Number(coinauthor2) +  Number(args[1])

                remove1 = Number(coinauthor) - Number(args[1])
                remove2 = Number(coinauthor2) - Number(args[1])
                if(interaction.user.id !== opponent.id) return interaction.reply({ content: `C'est ${opponent.username} qui doit cliquer ici !`, ephemeral: true})
                msg.delete()
                const ExplicationEmbed = new Discord.EmbedBuilder()
                .setTitle(`Duel de gun entre ${message.author.username} et ${opponent.username}`)
                .setDescription(`**Objectif**:\nÊtre le premier à cliquer sur son boutton !\n__Exemples:__`)
                .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1126866849745870918/Capture_decran_2023-07-07_a_15.26.28.png?width=1480&height=316`)
                .setFooter({ text: `5 secondes avant le début` })
                .setColor(color)

                const msg2 = await message.channel.send({ embeds: [ExplicationEmbed] })

                wait(5000).then(async () => {
                    const positions = {
                    three: `_ _ :levitate: :point_right:       **3**       :point_left: :levitate:`,
                    two: `_ _ :levitate: :point_right:       **2**       :point_left: :levitate:`,
                    one: `_ _ :levitate: :point_right:       **1**       :point_left: :levitate:`,
                    go: `_ _ :levitate: :point_right:       **GO!**       :point_left: :levitate:`,
                    ended1: `_ _ :levitate: :point_right:       **STOP!**       :skull_crossbones: :levitate:`,
                    ended2: `_ _ :levitate: :skull_crossbones:       **STOP!**       :point_left: :levitate: `,
                };

    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('shoot1')
                .setLabel(`Tire ${opponent.username} !`)
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('useless')
                .setLabel('⚔️')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('shoot2')
                .setLabel(`Tire ${message.author.username} !`)
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true)
        );

    const msg = await message.channel.send({
        content: positions.three,
        components: [row],
    });

    function countdown() {
        setTimeout(() => {
            msg.edit({
                content: positions.two,
                components: [row],
            });
        }, 1000);
        setTimeout(() => {
            msg.edit({
                content: positions.one,
                components: [row],
            });
        }, 2000);
        setTimeout(() => {
            row.components[0].setDisabled(false);
            row.components[2].setDisabled(false);
            msg.edit({
                content: positions.go,
                components: [row],
            });
        }, 3000);
    }

    countdown();

    const filter = (button) => {
        return button.user.id === message.author.id || button.user.id === opponent.id;
    };

    const collector = msg.createMessageComponentCollector({ filter, componentType: Discord.ComponentType.Button, max: 1 });

    collector.on('collect', (button) => {
        row.components[0].setDisabled(true);
        row.components[2].setDisabled(true);

        if (button.customId === 'shoot2' && button.user.id === message.author.id) {
            msg.edit({
                content: positions.ended1,
                components: [row],
            });
            
            bot.db.query(`UPDATE user SET coins = '${coinsauthorfin}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE user SET coins = '${remove2}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)

            button.reply({ content: `<@${message.author.id}> remporte ce duel !\nLa mise de \`${Number(args[1]) * 2} coins\` a bien été versée sur son compte !` });
        } else if (button.customId === 'shoot1' && button.user.id === opponent.id) {
            msg.edit({
                content: positions.ended2,
                components: [row],
            });

            bot.db.query(`UPDATE user SET coins = '${remove1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
            bot.db.query(`UPDATE user SET coins = '${coinauthor2fin}' WHERE guildId = '${message.guild.id}' AND userId = '${opponent.id}'`)
            button.reply({ content: `<@${opponent.id}> remporte ce duel !\nLa mise de \`${Number(args[1]) * 2} coins\` a bien été versée sur son compte !` });
        }
    });
                })


            }
    })


        }
      })

        }

       
      })
}

function wait(temps) {
  return new Promise(resolve => setTimeout(resolve, temps));
}