import path from 'path';

import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config = {
	'entry': path.resolve(__dirname, '../src', 'main.ts'),
	'output': {
		'path': path.resolve(__dirname, '../dist'),
		'filename': 'main.js',
	},
	'module': {
		'rules': [
			{
				'test': /\.jsx?$/,
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	'devtool': '#source-map',
	'resolve': {
		'extensions': [
			'.ts',
			'.tsx',
			'.js',
			'.json',
		],
	},
	'target': 'node',
	'node': {
		'__dirname': true,
	},
	'externals': [
		nodeExternals(),
	],
};

export default config;
