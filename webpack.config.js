const path = require("path");

module.exports = {
  entry: "./build/browser.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "browser.js",
  },
};
