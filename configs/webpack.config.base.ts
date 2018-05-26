import * as fs from 'fs';
import * as path from 'path';

import * as webpack from 'webpack';

export const distPath = path.resolve(__dirname, '../dist');

export const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const envPath = path.resolve(__dirname, '../.env');

export const baseConfig: webpack.Configuration = {
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
			'__dev': (process.env.NODE_ENV === 'development'),
			'__env': (() => {
				const t = process.env.TRAVIS;
				console.log(t);
				console.log(typeof t);
				if(t) {
					return {
						'database_user': 'root',
						'database_password': 'test',
						'database_name': 'test',
					};
				}

				const data = fs.readFileSync(envPath);
				return JSON.stringify(data.toString().trim().split('\n').map((e) => {
					const t = e.split('=');
					return {
						[t[0]]: t[1],
					};
				}).reduce((a, b) => {
					return {
						...a,
						...b,
					};
				}));
			})(),
		}),
		new webpack.ProgressPlugin(),
	],
	'mode': env,
};
