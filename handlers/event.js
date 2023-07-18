const fs = require("fs");

module.exports = (bot) => {
  const eventFiles = fs
    .readdirSync("./events/")
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`../events/${file}`);
    const eventName = event.name;
    const eventHandler = event.execute;

    if (event.once) {
      bot.once(eventName, (...args) => eventHandler(...args, bot));
    } else {
      bot.on(eventName, (...args) => eventHandler(...args, bot));
    }

    console.log(`✅・${file} [Events]`);
  }

  const eventSubFolders = fs
    .readdirSync("./events/")
    .filter((folder) => !folder.endsWith(".js"));

  for (const folder of eventSubFolders) {
    const subEventFiles = fs
      .readdirSync(`./events/${folder}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of subEventFiles) {
      const event = require(`../events/${folder}/${file}`);
      const eventName = event.name;
      const eventHandler = event.execute;

      if (event.once) {
        bot.once(eventName, (...args) => eventHandler(...args, bot));
      } else {
        bot.on(eventName, (...args) => eventHandler(...args, bot));
      }

      console.log(`✅・${file} - ${folder} [Events]`);
    }
  }
};