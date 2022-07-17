module.exports = {
  name: 'ready',
  callback: (client) => {    
    client.user.setPresence({ activities: [{ name: 'discord.gg/avdanos', type: 'WATCHING' }] });
    console.log('Start completed.');
  }
};
