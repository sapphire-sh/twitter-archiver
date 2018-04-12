import * as path from 'path';

import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';

import {
	baseConfig,
	outputPath,
} from '../configs';

export const serverConfig: webpack.Configuration = {
	...baseConfig,
	'entry': path.resolve(__dirname, '../src', 'main.ts'),
	'output': {
		'path': outputPath,
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
		new webpack.DefinePlugin({
			'__dev': process.env.NODE_ENV === 'development',
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
