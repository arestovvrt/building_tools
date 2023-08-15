const { merge } = require("webpack-merge");
const common = require("./webpack.common.config.js");

module.exports = merge(common, {
  mode: "production",
  target: "browserslist",
  module: {
    rules: [
      // --- Images
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        // Изображения инлайниться в код
        type: "asset",
      },
      // --- Audio
      {
        test: /\.(mp3|flac|wav)$/i,
        // Изображения инлайниться в код
        type: "asset",
      },
    ],
  },
});
