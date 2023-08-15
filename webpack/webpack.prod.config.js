const { merge } = require("webpack-merge");
const common = require("./webpack.common.config.js");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  target: "browserslist",
  module: {
    rules: [
      // --- Images
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [
                    "imagemin-gifsicle",
                    "imagemin-mozjpeg",
                    "imagemin-pngquant",
                    "imagemin-svgo",
                  ],
                },
              },
            },
          },
        ],
      },
    ],
  },
});
