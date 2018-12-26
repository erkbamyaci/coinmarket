"use strict";

const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: ["./src/main.js"],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  devServer: {
    port: 8081
  },
  plugins: [new VueLoaderPlugin()]
};
