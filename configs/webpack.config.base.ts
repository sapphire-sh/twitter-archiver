import * as fs from 'fs';
import * as path from 'path';

import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

function getEnv() {
	return new Promise((resolve, reject) => {
		const envPath = path.resolve(__dirname, '../.env');
		fs.readFile(envPath, (err, data) => {
			if(err) {
				reject(err);
			}
			const env = data.toString().trim().split('\n').map((e) => {
				const t = e.split('=');
				return {
					[t[0]]: t[1],
				};
			}).reduce((a, b) => {
				return {
					...a,
					...b,
				};
			});
			resolve(env);
		});
	});
}

export function getBaseConfig(mode: string) {
	return getEnv().then((env) => {
		const baseConfig: webpack.Configuration = {
			'devtool': '#source-map',
			'resolve': {
				'extensions': [
					'.ts',
					'.tsx',
					'.js',
					'.json',
				],
			},
			'plugins': [
				new webpack.DefinePlugin({
					'__dev': mode === 'dev',
					'__env': JSON.stringify(env),
				}),
				new webpack.ProgressPlugin(),
			],
			'mode': mode === 'dev' ? 'development' : 'production',
		};
		return Promise.resolve(baseConfig);
	});
}

export const outputPath = path.resolve(__dirname, '../dist');
