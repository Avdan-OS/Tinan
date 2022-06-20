// const commands = require('../handlers/cmdHandler.js');

module.exports = {
  name: 'ready',
  callback: (client) => {
    // commands(client);
    
    client.user.setPresence({ activities: [{ name: 'discord.gg/avdanos', type: 'WATCHING' }] });
    console.log('Start completed.');
  }
};
