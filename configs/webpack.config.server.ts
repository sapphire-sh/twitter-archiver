import path from 'path';

import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import {
	env,
	baseConfig,
	distPath,
} from '../configs/webpack.config.base';

console.log(distPath);

export const serverConfig: webpack.Configuration = {
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
		...baseConfig.plugins!,
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
