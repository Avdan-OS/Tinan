const getFiles = require('../utils/getFiles');

module.exports = (client) => {
  const events = [];
  const eventFiles = getFiles('/events', '.js');

  for (const eventFile of eventFiles) {
    const event = require(eventFile);
    events[event.name.toLowerCase()] = event;
    
  // try {
  //   if (eventFile.once) client.once(events[event.name], () => callback());
  //   else client.on(events[event.name], () => callback());
  // } catch (error) {
  //   console.error(error);
  // }
    try {
      client.on(events[event.name].callback(client));
    } catch (error) {
      console.error(error);
    }
    console.log(events);
  }
};
