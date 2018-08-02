import webpack from 'webpack';

import {
	webpackCompile,
} from './webpackCompiler';

import {
	serverConfig,
} from '../configs/webpack.config.server';

function start(config: webpack.Configuration) {
	webpackCompile([
		config,
	]).then(() => {
		console.log('done');
	}).catch((err) => {
		console.error(err);
		process.exit(1);
	});
}

start(serverConfig);
