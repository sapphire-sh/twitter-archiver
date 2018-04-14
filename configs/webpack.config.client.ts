import * as path from 'path';

import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import {
	getBaseConfig,
	outputPath,
} from './webpack.config.base';

export {
	outputPath,
}

export function getClientConfig(mode: string) {
	return getBaseConfig(mode).then((baseConfig) => {
		return Promise.all([
			'react',
		].map((dllName) => {
			return path.resolve(__dirname, '../dist', dllName);
		}).map((dllPath) => {
			return import(dllPath);
		})).then((results) => {
			const clientConfig: webpack.Configuration = {
				...baseConfig,
				'entry': [
					path.resolve(__dirname, '../src', 'client.tsx'),
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
					new ExtractTextPlugin('styles.css'),
					...results.map((dll) => {
						return new webpack.DllReferencePlugin({
							'context': process.cwd(),
							'manifest': dll,
						});
					}),
				],
			};
			if(mode === 'dev') {
				clientConfig.entry = [
					'webpack-hot-middleware/client',
					...clientConfig.entry as string[],
				];
				clientConfig.devServer = {
					'port': 8015,
				};
				clientConfig.plugins = [
					...clientConfig.plugins!,
					new webpack.HotModuleReplacementPlugin(),
				];
			}
			if(mode === 'prod') {
				clientConfig.plugins = [
					...clientConfig.plugins!,
					new webpack.LoaderOptionsPlugin({
						'minimize': true,
					}),
				];
			}

			return Promise.resolve(clientConfig);
		});
	});
}
