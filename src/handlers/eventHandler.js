const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
  const events = [];
  const eventPath = './events';

  fs.readdirSync(path.join(process.cwd(), eventPath)).filter(file => file.endsWith('.js')).forEach(async file => {
    const pull = require(path.join(process.cwd(), eventPath, file));
    events.push(pull);

    try {
      for (evt of events) { await client.on(evt.callback(client), () => {}) }
    } catch (error) {
      console.error(error);
    }
  });
};
