const { merge } = require("webpack-merge");
const common = require("./webpack.common.config.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  target: "web",
  module: {
    rules: [
      // --- Images
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        // Будут помещаться в build/assets
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext][query]",
        },
      },
      // --- Audio
      {
        test: /\.(mp3|flac|wav)$/i,
        // Будут помещаться в build/assets
        type: "asset/resource",
        generator: {
          filename: "audio/[hash][ext][query]",
        },
      },
    ],
  },
});
