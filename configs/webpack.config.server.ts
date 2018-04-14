import * as path from 'path';

import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';

import {
	getBaseConfig,
	outputPath,
} from './webpack.config.base';

export {
	outputPath,
}

export function getServerConfig(mode: string) {
	return getBaseConfig(mode).then((baseConfig) => {
		const serverConfig: webpack.Configuration = {
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
				...baseConfig.plugins!,
			],
			'target': 'node',
			'node': {
				'__dirname': true,
			},
			'externals': [
				nodeExternals(),
			],
		};
		if(mode === 'prod') {
			serverConfig.plugins = [
				...serverConfig.plugins!,
				new webpack.LoaderOptionsPlugin({
					'minimize': true,
				}),
			];
		}

		return Promise.resolve(serverConfig);
	});
}
