const path = require("path");
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/assets/styles/*.scss"),
        path.resolve(__dirname, "./src/assets/styles/abstracts/*.scss"),
        path.resolve(__dirname, "./src/assets/styles/vars/*.scss")
      ]
    }
  }
};
