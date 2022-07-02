const { Webhooks } = require("@octokit/webhooks");
const handler = require("./devRecruiter");
const permissonUpdater = require("./permissonProvider");


const webhooks = new Webhooks({ secret: "1111" })

webhooks.on("push", ({ id, name, payload }) => {
  console.log(name, "event received and ", payload);
  handler(payload);
  permissonUpdater()
});

module.exports = webhooks