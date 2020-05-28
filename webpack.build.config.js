const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

// Any directories you will be adding code/files into,
// need to be added to this array so webpack will pick them up
const rendererInclude = path.resolve(__dirname, "src");
const mainInclude = path.resolve(__dirname, "main");

module.exports = [
  {
    mode: "production",
    entry: path.join(__dirname, "main", "swell.js"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "main-bundle.js",
    },
    target: "electron-main",
    node: {
      __dirname: false,
      __filename: false,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: "babel-loader",
          include: mainInclude,
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          include: mainInclude,
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          include: mainInclude,
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            { loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" },
          ],
          include: mainInclude,
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|mp3)$/,
          use: [
            { loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" },
          ],
          include: mainInclude,
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {},
          },
        }),
      ],
    },
    externals: [nodeExternals()],
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
    stats: {
      colors: true,
      children: false,
      chunks: false,
      modules: false,
    },
  },
  {
    mode: "production",
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "renderer-bundle.js",
    },
    target: "electron-renderer",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: "babel-loader",
          include: rendererInclude,
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          include: rendererInclude,
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          include: rendererInclude,
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            { loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" },
          ],
          include: rendererInclude,
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|mp3)$/,
          use: [
            { loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" },
          ],
          include: rendererInclude,
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {},
          },
        }),
      ],
    },
    externals: [nodeExternals()],
    plugins: [
      new HtmlWebpackPlugin({ title: "Swell v0.4.0" }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "bundle.css",
        chunkFilename: "[id].css",
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
    stats: {
      colors: true,
      children: false,
      chunks: false,
      modules: false,
    },
  },
];
