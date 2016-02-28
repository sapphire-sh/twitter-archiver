'use strict';

var path = require('path');

module.exports = {
	entry: ['./src/index.jsx'],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
};

