const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const {
	baseConfig,
	distPath,
	env,
} = require('../configs/webpack.config.base');

module.exports = {
	...baseConfig,
	'entry': path.resolve(__dirname, '../src/server', 'index.ts'),
	'output': {
		'path': distPath,
		'filename': 'main.js',
	},
	'module': {
		'rules': [
			{
				'test': /\.js?$/,
				'use': {
					'loader': 'babel-loader',
				},
			},
			{
				'test': /\.tsx?$/,
				'use': [
					'ts-loader',
				],
			},
		],
	},
	'plugins': [
		...baseConfig.plugins,
		...(() => {
			if(env === 'production') {
				return [
					new webpack.LoaderOptionsPlugin({
						'minimize': true,
					}),
				];
			}
			return [];
		})(),
	],
	'target': 'node',
	'node': {
		'__dirname': true,
	},
	'externals': [
		nodeExternals(),
	],
};
