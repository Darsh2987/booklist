const path = require("path");

module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundled-script.js",
    path: path.resolve(__dirname, "dist"),
  },
};
