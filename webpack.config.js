const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist/",
    filename: "output.bundle.js",
  },
  //   This is to generate source maps
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weather App",
      template: "./src/templates/index.pug",
      minify: true,
      publicPath: "./",
      meta: {
        author: "https://github.com/iresharma",
        language: "English",
        robots: "index, follow",
        keywords: "webpack,iresharma,babel,sass,pug,api",
        description:
          "A weather app made for simple webpack config with support for js, .pug, .sass and .scss. Made by @iresharma",
        title: "Weather APP",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "css/", name: "[name].min.css" },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
    ],
  },
};
