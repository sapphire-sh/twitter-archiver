import {
	webpackCompile,
} from './webpackCompiler';

import {
	clientConfig,
	serverConfig,
} from '../configs';

webpackCompile([
	clientConfig,
	serverConfig,
]).then(() => {
	console.log('done');
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
