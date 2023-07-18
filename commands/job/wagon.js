const Discord = require("discord.js");
const { ComponentType } = require('discord.js');

exports.help = {
    name: "wagon",
    category: "job",
    aliases: ["minerais"],
    description: "Affiche le contenu de votre wagon",
    usage: "Pas d'utilisation conseillée"
}
exports.run = async (bot, message, args, color) => {
        bot.db.query(`SELECT * FROM mine WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const buyWagon = new Discord.EmbedBuilder()
        .setDescription('❌ Vous devez acheter un wagon avant de pouvoir utiliser cette commande !\nExemple: `buy wagon`')
        .setColor(color)

        if(req[0].wagon == 0) return message.reply({ embeds: [buyWagon] });

        const prix = {
            "charbon": 100,
            "fer": 150,
            "or": 250,
            "diamant": 400
        }

        const wagonSelect = new Discord.StringSelectMenuBuilder()
            .setCustomId('wagonSelector')
            .setPlaceholder("Faire une action")
            .addOptions(
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Vendre")
                    .setDescription('Permets de vendre un minerais')
                    .setValue('wagonSell')
            )
        
        const row = new Discord.ActionRowBuilder().addComponents(wagonSelect)

        let wagonEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setDescription(`\`💵\` - Vendre des minerais\n\`📞\` - Donner des minerais\n\n\`\`\` \`\`\`\n\n**Charbon:** ${req[0].charbon}\n**Fer:** ${req[0].fer}\n**Or:** ${req[0].ors}\n**Diamant:** ${req[0].diamant}\n\n*Vous pouvez miner encore ${req[0].wagon} fois avant que le wagon se casse !*\n*Utilisez la commande \`buy wagon\` pour racheter des wagons !*`)
        .setColor(color)
        .setThumbnail('https://media.discordapp.net/attachments/1121718489829347358/1129334809232154634/wagon-removebg-preview.png?width=550&height=550')
        const msg = await message.reply({ embeds: [wagonEmbed], components: [row] });

        const collector = msg.createMessageComponentCollector({ components: ComponentType.StringSelect });

        collector.on('collect', async interaction => {
            let minerais;
            let minerais2;
            let minerais3;
            let price;
            let nombreminerais;
            if(interaction.customId == 'wagonSelector') {
                if(interaction.user.id !== message.author.id) return interaction.reply({ content: 'Vous n\'avez pas la permission !', ephemeral: true });

                if(interaction.values[0] == 'wagonSell') {
                    interaction.deferUpdate();
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: 'Vous n\'avez pas la permission !', ephemeral: true });
                    interaction.channel.send(':question: Entrez maintenant le minerais que vous souhaitez vendre:').catch(_ => { });
                    let filter2 = (m) => m.author.id == interaction.user.id;
                    await interaction.channel.awaitMessages({ 
                        filter: filter2,
                        max: 1
                    }).then(async (collected) => {
                        if(collected.first().content.toLowerCase() == 'charbon') minerais = 'charbon', minerais2 = req[0].charbon, minerais3 = 'charbon';
                        if(collected.first().content.toLowerCase() == 'fer') minerais = 'fer', minerais2 = req[0].fer, minerais3 = 'fer';
                        if(collected.first().content.toLowerCase() == 'or') minerais = 'or', minerais2 = req[0].ors, minerais3 = 'ors';
                        if(collected.first().content.toLowerCase() == 'diamant') minerais = 'diamant', minerais2 = req[0].diamant, minerais3 = 'diamant';
                        if(minerais == 'charbon' || minerais == 'fer') {
                            collected.first().reply(`:question: Entrez maintenant la quantité de **${minerais}** que vous souhaitez vendre:`);
                            let filter2 = (m) => m.author.id == interaction.user.id;
                            await interaction.channel.awaitMessages({ 
                                filter: filter2,
                                max: 1
                            }).then(async (collected) => {
                            if(isNaN(collected.first().content)) return collected.first().reply(':x: Ceci n\'est pas un chiffre valide !');
                            if(collected.first().content < 5) return collected.first().reply(`Vous devez vendre 5 ${minerais} minimum !`);
                            if(collected.first().content < minerais2) return collected.first().reply(':x: Vous n\'avez pas assez de ce minerais !');

                            price = Number(prix[minerais]) * Number(collected.first().content);
                            nombreminerais = collected.first().content;
                            message.channel.send(`Êtes-vous sûr de vouloir vendre **${collected.first().content} ${minerais}** pour \`${price}\` ? \`oui\` ?`);
                            let filter2 = (m) => m.author.id == interaction.user.id;
                            await interaction.channel.awaitMessages({ 
                                filter: filter2,
                                max: 1
                            }).then(async (collected) => {
                                if(collected.first().content.toLowerCase() == 'oui') {
                                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                        let embedVente = new Discord.EmbedBuilder()
                                        .setDescription(`:pick: Vous venez de vendre ${nombreminerais} ${minerais} pour \`${price} coins\``)
                                        .setColor(color)
                                        .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
                                        message.channel.send({ embeds: [embedVente] });
                                        let coins = Number(req[0].coins) + Number(price);
                                        let finalMinerais = Number(minerais2) - Number(nombreminerais);

                                        bot.db.query(`UPDATE user SET coins = '${coins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                        bot.db.query(`UPDATE mine SET ${minerais3} = '${finalMinerais}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    })
                                }
                            })
                            })
                        }

                        if(minerais == 'or' || minerais == 'diamant') {
                            collected.first().reply(`:question: Entrez maintenant la quantité de **${minerais}** que vous souhaitez vendre:`);
                            let filter2 = (m) => m.author.id == interaction.user.id;
                            await interaction.channel.awaitMessages({ 
                                filter: filter2,
                                max: 1
                            }).then(async (collected) => {
                            if(isNaN(collected.first().content)) return collected.first().reply(':x: Ceci n\'est pas un chiffre valide !');
                            if(collected.first().content < 5) return collected.first().reply(`Vous devez vendre 5 ${minerais} minimum !`);
                            if(collected.first().content < minerais2) return collected.first().reply(':x: Vous n\'avez pas assez de ce minerais !');

                            price = Number(prix[minerais]) * Number(collected.first().content);
                            nombreminerais = collected.first().content;
                            message.channel.send(`Êtes-vous sûr de vouloir vendre **${collected.first().content} ${minerais}** pour \`${price}\` ? \`oui\` ?`);
                            let filter2 = (m) => m.author.id == interaction.user.id;
                            await interaction.channel.awaitMessages({ 
                                filter: filter2,
                                max: 1
                            }).then(async (collected) => {
                                if(collected.first().content.toLowerCase() == 'oui') {
                                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                                        let embedVente = new Discord.EmbedBuilder()
                                        .setDescription(`:pick: Vous venez de vendre ${nombreminerais} ${minerais} pour \`${price} coins\``)
                                        .setColor(color)
                                        .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
                                        message.channel.send({ embeds: [embedVente] });
                                        let coins = Number(req[0].coins) + Number(price);
                                        let finalMinerais = Number(minerais2) - Number(nombreminerais);

                                        bot.db.query(`UPDATE user SET coins = '${coins}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                        bot.db.query(`UPDATE mine SET ${minerais3} = '${finalMinerais}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                    })
                                }
                            })
                            })
                        }
                    })
                }
            }
        })
    })
} 