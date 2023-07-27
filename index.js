const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js");
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildInvites,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent,
  ],
  disableMentions: 'everyone',
  disableMentions: 'all'
});
const ms = require("ms")
bot.setMaxListeners(70)

bot.commands = new Collection();
bot.antirob = new Map()

console.log(`
    /////////////////////////////////////
    //                                 // By WhiteHall
    //  https://discord.gg/zcN3sB5KSv  //
    //                                 //
    ///////////////////://///////////////
`)

bot.config = require('./config.json')
bot.footer = {
  text: "WhiteHall | Coins",
  iconURL:
    "https://media.discordapp.net/attachments/1121718489829347358/1123516884550168576/a_f6e022c4f28191fc0ca035b262cc5c4e_copie.jpg?width=562&height=562",
};
bot.whitehall = "https://discord.gg/zcN3sB5KSv"

bot.on("messageCreate", (message) => {
  if (!message.guild) return;
  let pref;
  bot.db.query(`SELECT * FROM guild WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (req.length < 1) {
        pref = "&"
      } else {
        pref = req[0].prefix;
      if (!pref) pref = "&";
      }
      bot.prefix = pref;
    }
  );
});


bot.on("ready", async (bot) => {
  let pill = 0
  setInterval(() => {
  pill = Math.floor(Math.random() * (20000 - 0 + 1)) + 0;
  bot.pill = pill
  }, ms('5m'))
})

const commandHandler = require("./handlers/command.js")(bot);
const anticrashHandler = require("./utils/anticrash");
anticrashHandler(bot);
const eventdHandler = require("./handlers/event.js")(bot);
const loadDatabase = require("./handlers/loadDatabase");
const DataBase = require("./handlers/loginDatabase");
DataBase.connectDatabase(bot)


bot.login(bot.config.token);
