const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.resolve(rootPath, 'src');
const distPath = path.resolve(rootPath, 'dist');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const envPath = path.resolve(__dirname, '../.env');

module.exports.rootPath = rootPath;
module.exports.srcPath = srcPath;
module.exports.distPath = distPath;

module.exports.env = env;

module.exports.baseConfig = {
	'devtool': false,
	'resolve': {
		'extensions': [
			'.ts',
			'.tsx',
			'.js',
			'.json',
		],
		'alias': {
			'~': srcPath,
			'~/client': path.resolve(srcPath, 'client'),
			'~/server': path.resolve(srcPath, 'server'),
			'~/shared': path.resolve(srcPath, 'shared'),
		},
	},
	'plugins': [
		new webpack.DefinePlugin({
			'__dev': process.env.NODE_ENV === 'development',
			'__test': process.env.NODE_ENV === 'test',
			'__env': (() => {
				if(process.env.TRAVIS === 'true') {
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
			'__path': JSON.stringify({
				'dist': distPath,
			}),
		}),
		new webpack.ProgressPlugin(),
	],
	'mode': env,
};
