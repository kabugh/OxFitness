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
    name: "OxFitness",
    themeColor: "#6b108e",
    msTileColor: "#6b108e",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#6b108e"
  },

  transpileDependencies: ["quasar"]
};
