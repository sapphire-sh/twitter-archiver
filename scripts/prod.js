import Promise from 'bluebird';

import webpack from 'webpack';

import configServer from '../configs/webpack.server';
import configClient from '../configs/webpack.client';

const configs = [
	configServer,
	configClient,
];

function build(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if(err || stats.hasErrors()) {
				reject(err);
			}
			else {
				process.stdout.write(`${stats.toString({
					'colors': true,
					'modules': true,
					'children': false,
					'chunks': false,
					'chunkModules': false,
				})}\n`);

				resolve();
			}
		});
	});
}

Promise.each(configs, (config) => {
	return build(config);
})
.catch((err) => {
	console.log(err);
});
