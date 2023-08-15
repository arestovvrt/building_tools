const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const buildDir = "build";

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
  new webpack.HotModuleReplacementPlugin(), // применять изменения только при горячей перезагрузке
  //new BundleAnalyzerPlugin(),
];

const devServer = {
  historyApiFallback: true,
  open: true,
  compress: true,
  allowedHosts: "all",
  hot: true, // Включает автоматическую перезагрузку страницы при изменениях
  static: {
    directory: path.resolve(__dirname, "..", buildDir),
  },
  port: 3000,
};

module.exports = {
  devServer,
  plugins,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "..", buildDir),
    //publicPath tells to webpack-dev-server where to serve the bundle in memory
    publicPath: "/",
    filename: "bundle.js",
    // Все asset/resource будут складываться в build/assets,
    // Если для них не указан путь в generator: {}
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },

  module: {
    rules: [
      // --- Загрузчик для html (html-loader)
      { test: /\.(html)$/, use: ["html-loader"] },
      // --- S/A/C/SS
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates css into CommonJS
            options: {
              modules: true, // css modules
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]", // format of output
              },
            },
          },
          "postcss-loader", // autoprefixer
        ],
      },
      // --- S/A/SS
      {
        test: /\.(s[ac])ss$/i,
        use: ["sass-loader"],
      },
      // --- JS
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // --- Images
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        // Будут помещаться в build/assets
        type: "asset/resource",
        generator: {
          filename: "assets/img/[name][ext][query]",
        },
      },
      // --- Audio/video
      {
        test: /\.(mp[3|4]|flac|wav)$/i,
        // Будут помещаться в build/assets
        type: "asset/resource",
        generator: {
          filename: "assets/media/[name][ext][query]",
        },
      },
      // --- Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        // Шрифты инлайнятся в код
        type: "asset/inline",
        generator: {
          filename: "[path][name][ext][query]",
        },
      },
      // --- Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
          },
        },
      },
    ],
  },
};
