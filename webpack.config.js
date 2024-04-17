const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/client/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
	  {
		test: /\.(css)$/,
		use: ['style-loader','css-loader']
	 }
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  devServer: {
    static: "dist",
  },
};
