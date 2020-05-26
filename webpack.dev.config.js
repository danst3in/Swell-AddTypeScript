const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { spawn } = require("child_process");
const nodeExternals = require("webpack-node-externals");

// Any directories you will be adding code/files into,
// need to be added to this array so webpack will pick them up
const rendererInclude = path.resolve(__dirname, "src");
const mainInclude = path.resolve(__dirname, "main");

module.exports = [
  {
    mode: "development",
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
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            { loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|mp3)$/,
          use: [
            { loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" },
          ],
        },
      ],
    },
    externals: [nodeExternals()],
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      stats: {
        colors: true,
        chunks: false,
        children: false,
      },
      before() {
        spawn("electron", ["."], {
          shell: true,
          env: process.env,
          stdio: "inherit",
        })
          .on("close", (code) => process.exit(0))
          .on("error", (spawnError) => console.error(spawnError));
      },
    },
  },
  {
    mode: "development",
    entry: path.join(__dirname, "src", "index.js"),
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
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            { loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|mp3)$/,
          use: [
            { loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" },
          ],
        },
      ],
    },
    externals: [nodeExternals()],
    plugins: [
      new HtmlWebpackPlugin({ title: "Swell v0.4.0" }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      stats: {
        colors: true,
        chunks: false,
        children: false,
      },
      before() {
        spawn("electron", ["."], {
          shell: true,
          env: process.env,
          stdio: "inherit",
        })
          .on("close", (code) => process.exit(0))
          .on("error", (spawnError) => console.error(spawnError));
      },
    },
  },
];
