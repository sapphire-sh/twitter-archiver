import Promise from 'bluebird';

import webpack from 'webpack';

import config from '../configs/webpack.server';

const compiler = webpack(config);
compiler.watch({}, (err, stats) => {
	if(err !== null) {
		console.error(err);
		return;
	}

	const info = stats.toJson();

	if(stats.hasErrors()) {
		info.errors.forEach((error) => {
			console.error(error);
		});
		return;
	}
	if(stats.hasWarnings()) {
		console.warn(info.warnings);
		return;
	}

	process.stdout.write(`${stats.toString({
		'colors': true,
		'modules': true,
		'children': false,
		'chunks': false,
		'chunkModules': false,
	})}\n`);
});
