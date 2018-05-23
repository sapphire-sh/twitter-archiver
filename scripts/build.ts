import * as fs from 'fs';
import * as path from 'path';

import * as webpack from 'webpack';

import {
	getDllConfig,
	getClientConfig,
	getServerConfig,
} from '../configs';

const mode = process.env.NODE_ENV!;

function webpackCompile(configs: webpack.Configuration[]) {
	return new Promise((resolve, reject) => {
		const compiler = webpack(configs);

		compiler.run((err, stats) => {
			if(err) {
				reject(err);
			}
			if(stats.hasErrors()) {
				reject(stats.toString('errors-only'));
			}
			resolve();
		});
	});
}

getDllConfig(mode).then((config) => {
	return webpackCompile([
		config,
	]);
}).then(() => {
	return Promise.all([
		getClientConfig(mode),
		getServerConfig(mode),
	]);
}).then((configs) => {
	console.log(configs[0]);
	return webpackCompile(configs);
}).then(() => {
	console.log('done');
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
