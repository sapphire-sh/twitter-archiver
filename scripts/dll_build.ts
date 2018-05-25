import * as fs from 'fs';

import {
	webpackCompile,
} from './webpackCompiler';

import {
	dllPath,
	dllConfig,
} from '../configs/webpack.config.dll';

try {
	fs.statSync(dllPath);
	console.log(`dll directory already exists`);
}
catch(err) {
	if(err.code === 'ENOENT') {
		webpackCompile([
			dllConfig,
		]).then(() => {
			console.log('done');
		}).catch((err) => {
			console.error(err);
			process.exit(1);
		});
	}
}
