'use strict';

let path = require('path');

module.exports = {
	entry: [
		'./src/client/index'
	],
	output: {
		path: path.resolve(__dirname + '/src/dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				loader: 'json',
				test: /\.json$/,
			},
			{
				exclude: /node_modules/,
				test: /\.jsx?$/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.jpg$/,
				loader: 'file-loader'
			},
			{
				test: /\.svg$/,
				loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
			},
			{
				test: /\.woff$/,
				loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'
			},
			{
				test: /\.woff2$/,
				loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
			},
			{
				test: /\.[ot]tf$/,
				loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'
			},
			{
				test: /\.eot$/,
				loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'
			},
		],
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx',
		],
	},
};
