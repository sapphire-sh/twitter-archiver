import * as fs from 'fs';
import * as path from 'path';

import * as webpack from 'webpack';

import {
	getDllConfig,
	getClientConfig,
	getServerConfig,
} from '../configs';

const mode = process.env.NODE_ENV!;

function importConfigs() {
	return Promise.all([
		getDllConfig(mode),
		getClientConfig(mode),
		getServerConfig(mode),
	]);
}

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

importConfigs().then((configs) => {
	return webpackCompile(configs);
}).then(() => {
	console.log('done');
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
