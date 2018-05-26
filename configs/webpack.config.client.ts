import * as path from 'path';

import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import {
	env,
	baseConfig,
	distPath,
} from '../configs/webpack.config.base';

export const clientConfig: webpack.Configuration = {
	...baseConfig,
	'entry': [
		path.resolve(__dirname, '../src', 'client.tsx'),
		...(() => {
			if(env === 'development') {
				return [
					'webpack-hot-middleware/client',
				];
			}
			return [];
		})(),
	],
	'output': {
		'path': distPath,
		'filename': 'bundle.js',
		'publicPath': '/',
	},
	'module': {
		'rules': [
			{
				'test': /\.tsx?$/,
				'use': {
					'loader': 'ts-loader',
				},
			},
			{
				'test': /\.s?css$/,
				'use': ExtractTextPlugin.extract({
					'fallback': 'style-loader',
					'use': [
						{
							'loader': 'css-loader',
						},
						{
							'loader': 'sass-loader',
						},
					],
				}),
			},
			{
				'test': /\.(png|jpe?g|svg)$/,
				'use': {
					'loader': 'url-loader',
					'options': {
						'limit': 8192,
					},
				},
			},
			{
				'test': /\.txt$/,
				'use': {
					'loader': 'file-loader',
				},
			},
			{
				'test': /\.(ttf|eot|woff2?)$/,
				'use': {
					'loader': 'file-loader',
					'options': {
						'name': 'fonts/[name].[ext]',
					},
				},
			},
		],
	},
	'plugins': [
		...baseConfig.plugins!,
		new ExtractTextPlugin('styles.css'),
		new webpack.DllReferencePlugin({
			'context': process.cwd(),
			'manifest': require('../dll/react.json'),
		}),
		...(() => {
			if(env === 'development') {
				return [
					new webpack.HotModuleReplacementPlugin(),
					new webpack.NoEmitOnErrorsPlugin(),
				];
			}
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
};
