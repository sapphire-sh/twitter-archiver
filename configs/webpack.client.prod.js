import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
	'entry': path.resolve(__dirname, '../src', 'client.tsx'),
	'output': {
		'path': path.resolve(__dirname, '../dist'),
		'filename': 'bundle.js',
		'publicPath': '/',
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
			{
				'test': /\.css$/,
				'use': ExtractTextPlugin.extract({
					'fallback': 'style-loader',
					'use': [
						{
							'loader': 'css-loader',
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
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
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
};

export default config;
