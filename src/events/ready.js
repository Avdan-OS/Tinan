const commands = require('../handlers/cmdHandler');

module.exports = {
  name: 'ready',
  callback: (client) => {
    commands(client);
    console.log('Start completed.');
  }
};
