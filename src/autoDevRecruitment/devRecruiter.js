const fs = require("fs");

module.exports = (payload) => {
  console.log("it runs !!");
  let lines;
  fetch(payload.compare).then((data) => {
    data.replace("", "");
    lines = data;
  });
};
