const Discord = require("discord.js")
const ms = require("ms")

exports.help = {
    name: "course",
    category: "administration",
    aliases: ["horseracing"],
    description: "Lance une course de cheval",
    usage: "course <mise> <durée_avant_lancement> <#channel/none>",
    permission: "whiteList"
}

exports.run = async (bot, message, args, color) => {
    let salon, cheval1 = [], cheval2 = [], cheval3 = [], cheval4 = [], cheval5 = []

    if(!args[0]) return message.reply(`:x: Vous devez indiquer une mise !`)
    if(isNaN(args[0])) return message.reply(`:x: Vous devez indiquer un nombre valide !`)
    if(Number(args[0]) <= 0) return message.reply(`:x: Vous devez indiquer un nombre valide !`)
    if(!args[1]) return message.reply(`:x: Merci d'indiqué la durée avant le lancement de la course de chevaux ! (\`s = secondes, m = minutes, h = heures, j = jours\`)`)
        try {
            ms(args[1]);
            if(!args[2]) { 
                salon = message.channel
            } else {
            const channelo = interaction.message.guild.channels.cache.get(args[2]) || collected.first().mentions.channels.first()
            if(!channelo) return message.channel.send({ content: `:x: Salon invalide !`});
            }

            const durationInMs = ms(args[1]);
            const now = new Date();
            const futureDate = new Date(now.getTime() + durationInMs);
            timestamp = Math.floor(futureDate.getTime() / 1000);

            const embed2 = new Discord.EmbedBuilder()
            .setTitle(`Votez pour un cheval !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1130425158105038848/depositphotos_176018860-stock-illustration-horsre-racecourse-vector-illustrations.webp?width=1200&height=674`)
            .setDescription(`La couse commence dans <t:${timestamp}:R>\n\n:one: :horse_racing:\n:two: :horse_racing:\n:three: :horse_racing:\n:four: :horse_racing:`)

            const button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji(`1️⃣`)
                .setCustomId("onecourse")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji(`2️⃣`)
                .setCustomId("twocourse")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji(`3️⃣`)
                .setCustomId("threecourse")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji(`4️⃣`)
                .setCustomId("fourcourse")
                .setStyle(Discord.ButtonStyle.Primary),
            )

            const msg = await salon.send({ embeds: [embed2], components: [button]})
            message.channel.send(`*Course lancée dans ${salon}*`)


            const collector = msg.createMessageComponentCollector({ time: ms(args[1]) });
        
              
        collector.on('collect', async (interaction) => {
            if(interaction.customId == "onecourse") {
                if(cheval5.includes(interaction.user.id)) return interaction.reply({ content: `T'as déjà voté pour un cheval !`, ephemeral: true })
                cheval1.push(interaction.user.id)
                cheval5.push(interaction.user.id)

                interaction.reply({ content: `T'as voté avec succès pour le cheval numéro 1 !`, ephemeral: true })
            }
            if(interaction.customId == "twocourse") {
                if(cheval5.includes(interaction.user.id)) return interaction.reply({ content: `T'as déjà voté pour un cheval !`, ephemeral: true })
                cheval2.push(interaction.user.id)
                cheval5.push(interaction.user.id)

                interaction.reply({ content: `T'as voté avec succès pour le cheval numéro 2 !`, ephemeral: true })
            }
            if(interaction.customId == "threecourse") {
                if(cheval5.includes(interaction.user.id)) return interaction.reply({ content: `T'as déjà voté pour un cheval !`, ephemeral: true })
                cheval3.push(interaction.user.id)
                cheval5.push(interaction.user.id)

                interaction.reply({ content: `T'as voté avec succès pour le cheval numéro 3 !`, ephemeral: true })
            }
            if(interaction.customId == "fourcourse") {
                if(cheval5.includes(interaction.user.id)) return interaction.reply({ content: `T'as déjà voté pour un cheval !`, ephemeral: true })
                cheval4.push(interaction.user.id)
                cheval5.push(interaction.user.id)

                interaction.reply({ content: `T'as voté avec succès pour le cheval numéro 4 !`, ephemeral: true })
            }
        })

        collector.on('end', async (interaction) => {
            let arrayCheval1 = [];
            let arrayCheval2 = [];
            let arrayCheval3 = [];
            let arrayCheval4 = [];

            const interval = setInterval(loop, 1500);
            message.channel.send(`:checkered_flag: La course commence !`)

            async function loop() {
                if(arrayCheval1.length == 6) {
                    clearInterval(interval)
                    message.channel.send(':trophy: Le cheval 1 a gagné !')
                    let content = "";
                    for(const userId of cheval1) {
                        const user = bot.users.cache.get(userId);
                        if(user) {
                        content += `${user}\n`
                        bot.db.query(`UPDATE user SET coins = coins + ${Number(args[0])} WHERE guildId = "${message.guild.id}" AND userId = "${user.id}"`);
                        }
                    }
                    await message.channel.send(`:dollar: Les joueurs suivants viennent de remporter **${args[0]} coins**:\n${content}`)
                }
                if(arrayCheval2.length == 6) {
                    clearInterval(interval)
                    let content = "";
                    for(const userId of cheval2) {
                        const user = bot.users.cache.get(userId);
                        if(user) {
                        content += `${user}\n`
                        bot.db.query(`UPDATE user SET coins = coins + ${Number(args[0])} WHERE guildId = "${message.guild.id}" AND userId = "${user.id}"`);
                        }
                    }
                    await message.channel.send(`:dollar: Les joueurs suivants viennent de remporter **${args[0]} coins**:\n${content}`)
                    message.channel.send(':trophy: Le cheval 2 a gagné !')
                }
                if(arrayCheval3.length == 6) {
                    clearInterval(interval)
                    message.channel.send(':trophy: Le cheval 3 a gagné !')
                    let content = "";
                    for(const userId of cheval3) {
                        const user = bot.users.cache.get(userId);
                        if(user) {
                        content += `${user}\n`
                        bot.db.query(`UPDATE user SET coins = coins + ${Number(args[0])} WHERE guildId = "${message.guild.id}" AND userId = "${user.id}"`);
                        }
                    }
                    await message.channel.send(`:dollar: Les joueurs suivants viennent de remporter **${args[0]} coins**:\n${content}`)
                }
                if(arrayCheval4.length == 6) {
                    clearInterval(interval)
                    message.channel.send(':trophy: Le cheval 4 a gagné !')
                    let content = "";
                    for(const userId of cheval4) {
                        const user = bot.users.cache.get(userId);
                        if(user) {
                        content += `${user}\n`
                        bot.db.query(`UPDATE user SET coins = coins + ${Number(args[0])} WHERE guildId = "${message.guild.id}" AND userId = "${user.id}"`);
                        }
                    }
                    await message.channel.send(`:dollar: Les joueurs suivants viennent de remporter **${args[0]} coins**:\n${content}`)
                }
                let random = Math.floor(Math.random() * (4 - 1 + 1)) + 1; 
                if(random == 1) {
                    arrayCheval1.push('🟩')
                }
    
                if(random == 2) {
                    arrayCheval2.push('🟩')
                }
    
                if(random == 3) {
                    arrayCheval3.push('🟩')
                }
    
                if(random == 4) {
                    arrayCheval4.push('🟩')
                }
                let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: 'Course en cours ! '})
                .setDescription(`
1️⃣ ${arrayCheval1.join('')} 🏇
2️⃣ ${arrayCheval2.join('')} 🏇
3️⃣ ${arrayCheval3.join('')} 🏇
4️⃣ ${arrayCheval4.join('')} 🏇`)
                .setImage('https://media.discordapp.net/attachments/1121718489829347358/1130425158105038848/depositphotos_176018860-stock-illustration-horsre-racecourse-vector-illustrations.webp')
                

            await msg.edit({ embeds: [embed], components: [] });
            }

        })

        } catch (error) {
            return message.channel.send({ content: `:x: temps invalide !`});
        }
}