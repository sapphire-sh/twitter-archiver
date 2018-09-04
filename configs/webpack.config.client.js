const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {
	baseConfig,
	distPath,
	dllPath,
	env,
} = require('../configs/webpack.config.base');

module.exports = {
	...baseConfig,
	'entry': path.resolve(__dirname, '../src/client', 'index.tsx'),
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
				'use': [
					{
						'loader': MiniCssExtractPlugin.loader,
					},
					{
						'loader': 'css-loader',
					},
					{
						'loader': 'sass-loader',
					},
				],
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
				'test': /\.html$/,
				'use': {
					'loader': 'file-loader',
					'options': {
						'name': '[name].[ext]',
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
		...baseConfig.plugins,
		new MiniCssExtractPlugin({
			'filename': 'styles.css',
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
			return [];
		})(),
		...(() => {
			if(process.env.NODE_ENV === 'analyze') {
				return [
					new BundleAnalyzerPlugin(),
				];
			}
			return [];
		})(),
	],
	'devServer': {
		'contentBase': [
			distPath,
			dllPath,
		],
		'watchContentBase': true,
		'proxy': {
			'/api': {
				'target': 'https://archive.sapphire.sh',
				'secure': false,
				'changeOrigin': true,
			},
			'/auth': {
				'target': 'https://archive.sapphire.sh',
				'secure': false,
				'changeOrigin': true,
			},
			'/socket.io': {
				'target': 'https://archive.sapphire.sh',
				'secure': false,
				'changeOrigin': true,
			},
		},
		'host': 'localhost',
		'port': 8016,
		'open': true,
	},
};
