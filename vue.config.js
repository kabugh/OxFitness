const path = require("path");
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: ["/Users/jakubtkaczyk/Projects/oxfit/src/assets/styles/*.scss"]
    },
    quasar: {
      importStrategy: "manual",
      rtlSupport: true
    }
  },

  pwa: {
    themeColor: "#000000"
  },

  transpileDependencies: ["quasar"]
};
