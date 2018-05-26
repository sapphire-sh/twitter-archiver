import {
	webpackCompile,
} from './webpackCompiler';

import {
	clientConfig,
} from '../configs/webpack.config.client';
import {
	serverConfig,
} from '../configs/webpack.config.server';

webpackCompile([
	clientConfig,
	serverConfig,
]).then(() => {
	console.log('done');
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
