const Discord = require("discord.js");
module.exports = {
  'name': "messageCreate",
  async 'execute'(message, bot) {
    if (!message.guild) {
      return;
    }
    if (message.author.bot) {
      return;
    }
    if (message.author.id == "1111007402960097352") {
      return;
    }
    if (message.author.id == "1087339149331271690") {
      return;
    }
    if (message.content == '<@' + bot.user.id + '>') {
      message.reply(":star: Mon prefix sur ce serveur est : " + bot.prefix);
    }
    let _0x42e814 = bot.prefix;
    if (_0x42e814 == undefined) {
      _0x42e814 = '&';
    }
    if (message.author.bot) {
      return;
    }
    let _0x2ae75e = message.content.split(" ");
    let _0x14795f = _0x2ae75e[0x0].toLowerCase();
    let _0x556d27 = _0x2ae75e.slice(0x1);
    if (!_0x14795f.startsWith(_0x42e814)) {
      return;
    }
    let _0x31bcf1;
    if (_0x14795f.startsWith(_0x42e814)) {
      _0x31bcf1 = _0x14795f.slice(_0x42e814.length);
    }
    await bot.db.query("SELECT * FROM user WHERE guildId = \"" + message.guild.id + "\" AND userId = \"" + message.author.id + "\"", async (_0x2272c4, req) => {
      if (req.length < 0x1) {
        if (message.content == _0x42e814 + "start") {
          const _0x4f7d8c = ["INSERT INTO batiment (guildId, userId) SELECT \"" + message.guild.id + "\", \"" + message.author.id + "\" WHERE NOT EXISTS (SELECT 1 FROM batiment WHERE guildId = " + message.guild.id + " AND userId = \"" + message.author.id + "\")", "INSERT INTO user (guildId, userId) SELECT \"" + message.guild.id + "\", \"" + message.author.id + "\" WHERE NOT EXISTS (SELECT 1 FROM user WHERE guildId = " + message.guild.id + " AND userId = \"" + message.author.id + "\")", "INSERT INTO gain (guildId) SELECT \"" + message.guild.id + "\" WHERE NOT EXISTS (SELECT 1 FROM gain WHERE guildId = " + message.guild.id + ')', "INSERT INTO mine (guildId, userId) SELECT \"" + message.guild.id + "\", \"" + message.author.id + "\" WHERE NOT EXISTS (SELECT 1 FROM mine WHERE guildId = " + message.guild.id + " AND userId = \"" + message.author.id + "\")", "INSERT INTO job (guildId, userId) SELECT \"" + message.guild.id + "\", \"" + message.author.id + "\" WHERE NOT EXISTS (SELECT 1 FROM job WHERE guildId = " + message.guild.id + " AND userId = \"" + message.author.id + "\")", "INSERT INTO xp (guildId) SELECT \"" + message.guild.id + "\" WHERE NOT EXISTS (SELECT 1 FROM xp WHERE guildId = " + message.guild.id + ')', "INSERT INTO commands (guildId) SELECT \"" + message.guild.id + "\" WHERE NOT EXISTS (SELECT 1 FROM commands WHERE guildId = " + message.guild.id + ')', "INSERT INTO guild (guildId) SELECT \"" + message.guild.id + "\" WHERE NOT EXISTS (SELECT 1 FROM guild WHERE guildId = " + message.guild.id + ')', "INSERT INTO logs (guildId) SELECT \"" + message.guild.id + "\" WHERE NOT EXISTS (SELECT 1 FROM logs WHERE guildId = " + message.guild.id + ')', "INSERT INTO bot (botId) SELECT \"" + bot.user.id + "\" WHERE NOT EXISTS (SELECT 1 FROM bot WHERE botId = " + bot.user.id + ')'];
          for (const _0x2f15cf of _0x4f7d8c) {
            bot.db.query(_0x2f15cf, _0x225db1 => {
              if (_0x225db1) {
                throw _0x225db1;
              }
            });
          }
        } else {
          return message.reply("Tu n'as pas commencé ta partie, fais la commande `" + _0x42e814 + "start`");
        }
      } else {
        bot.db.query("SELECT * FROM commands WHERE guildId = \"" + message.guild.id + "\"", async (_0xfc1f44, req) => {
          if (req.length < 0x1) {
            return;
          }
          if (req[0x0].adds == "off") {
            if (_0x31bcf1 == "add") {
              return message.reply(":x: Cette commande est désactivé du serveur !");
            }
          } else {
            if (req[0x0].remove == "off") {
              if (_0x31bcf1 == "remove") {
                return message.reply(":x: Cette commande est désactivé du serveur !");
              }
            } else {
              if (req[0x0].reset == "off") {
                if (_0x31bcf1 == "reset") {
                  return message.reply(":x: Cette commande est désactivé du serveur !");
                }
              }
            }
          }
          let _0x34e7d5 = bot.commands.get(_0x31bcf1);
          if (!_0x34e7d5) {
            return;
          }
          bot.db.query("SELECT * FROM commandBlock WHERE guildId = " + message.guild.id + " AND channelId = " + message.channel.id, async (_0x242fae, _0x7d14be) => {
            if (_0x7d14be.length >= 0x1) {
              const req = _0x7d14be[0x0].statut;
              if (req == "off") {
                return;
              }
            }
            let _0x108ab8 = "LightGrey";
            await bot.db.query("SELECT * FROM user WHERE guildId = \"" + message.guild.id + "\" AND userId = \"" + message.author.id + "\"", async (_0x1e7fb1, _0x7cc777) => {
              _0x108ab8 = _0x7cc777[0x0].color;
              if (_0x34e7d5) {
                if (bot.config.ownerId.includes(message.author.id)) {
                  _0x34e7d5.run(bot, message, _0x556d27, _0x108ab8);
                } else {
                  if (_0x34e7d5.help.permission == "administrator") {
                    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                      return message.channel.send("`❌` Vous devez être `administrateur` pour utiliser cette commande !");
                    }
                  } else {
                    if (_0x34e7d5.help.permission == "whiteList") {
                      bot.db.query("SELECT * FROM list WHERE guildId = \"" + message.guild.id + "\" AND whitelistId = \"" + message.author.id + "\"", async (_0x49ed22, _0x2dafc0) => {
                        if (_0x2dafc0.length < 0x1) {
                          bot.db.query("SELECT * FROM list2 WHERE guildId = \"" + message.guild.id + "\" AND ownerId = \"" + message.author.id + "\"", async (_0x576d07, _0x3efe18) => {
                            if (_0x3efe18.length < 0x1) {
                              return message.channel.send("`❌` Vous devez être `whitelist` pour utiliser cette commande !");
                            } else {
                              _0x34e7d5.run(bot, message, _0x556d27, _0x108ab8);
                            }
                          });
                        } else {
                          _0x34e7d5.run(bot, message, _0x556d27, _0x108ab8);
                        }
                      });
                    } else {
                      if (_0x34e7d5.help.permission == "owner") {
                        bot.db.query("SELECT * FROM list2 WHERE guildId = \"" + message.guild.id + "\" AND ownerId = \"" + message.author.id + "\"", async (_0xa2c73b, _0x318cdf) => {
                          if (_0x318cdf.length < 0x1) {
                            return message.channel.send("`❌` Vous devez être `owner` pour utiliser cette commande !");
                          } else {
                            _0x34e7d5.run(bot, message, _0x556d27, _0x108ab8);
                          }
                        });
                      } else {
                        if (_0x34e7d5.help.permission == "buyer") {
                          if (bot.config.ownerId.includes(message.author.id)) {
                            _0x34e7d5.run(bot, message, _0x556d27, _0x108ab8);
                          } else {
                            return;
                          }
                        } else {
                          _0x34e7d5.run(bot, message, _0x556d27, _0x108ab8);
                        }
                      }
                    }
                  }
                }
              }
            });
          });
        });
      }
    });
  }
};
