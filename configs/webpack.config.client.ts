import * as path from 'path';

import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import {
	baseConfig,
	outputPath,
} from '../configs';

export const clientConfig: webpack.Configuration = {
	...baseConfig,
	'entry': [
		path.resolve(__dirname, '../src', 'client.tsx'),
		'webpack-hot-middleware/client',
	],
	'output': {
		'path': outputPath,
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
		new webpack.DefinePlugin({
			'__dev': process.env.NODE_ENV === 'development',
		}),
		new webpack.DllReferencePlugin({
			'context': process.cwd(),
			'manifest': require('../dist/react.json'),
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('styles.css'),
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
	'devServer': {
		'port': 8015,
	},
};
