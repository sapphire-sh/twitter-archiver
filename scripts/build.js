import webpack from 'webpack';

import configClient from '../configs/webpack.client';
import configServer from '../configs/webpack.server';

const configs = [
	configClient,
	configServer,
];

function build() {
	webpack(configs, (err, stats) => {
		console.log(stats.hasErrors());
		if(err || stats.hasErrors()) {
			console.log(err);
		}
		else {
			process.stdout.write(`${stats.toString({
				'colors': true,
				'modules': true,
				'children': false,
				'chunks': false,
				'chunkModules': false,
			})}\n`);
		}
	});
}

build();
