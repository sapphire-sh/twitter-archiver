import Promise from 'bluebird';

import webpack from 'webpack';
const webpackAsync = Promise.promisify(webpack);

import clientConfig from './webpack.config.client';
import serverConfig from './webpack.config.server';

function getConfig(target) {
	switch(target) {
	case 'client':
		return clientConfig;
	case 'server':
		return serverConfig;
	}
}

const config = getConfig(process.env.NODE_TARGET);

function build() {
	webpackAsync(config)
	.then((stats) => {
		process.stdout.write(`${stats.toString({
			'colors': true,
			'modules': true,
			'children': false,
			'chunks': false,
			'chunkModules': false,
		})}\n`);
	})
	.catch((err) => {
		console.log(err);
	});
}

build();
