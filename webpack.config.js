const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader", // Injects CSS into the DOM
					"css-loader", // Translates CSS into CommonJS
					"sass-loader", // Compiles SASS to CSS
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html", // Source HTML file
			filename: "index.html", // Output HTML file
		}),
	],
	mode: "development",
};