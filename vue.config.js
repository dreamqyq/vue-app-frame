const appconfig = require("./appconfig");
const currentApp = appconfig.current;
const currentEntry = `./src/views/${currentApp}/main.js`;

const port = process.env.port || process.env.npm_config_port || 8321; // dev port
module.exports = {
  publicPath: "./",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    entry: {
      quote: currentEntry
    },
    optimization: {
      splitChunks: false
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    // config.plugins.delete('preload') // TODO: need test
    config.plugins.delete("prefetch"); // 消耗性能
    config.entryPoints.delete("app");
  }
};
