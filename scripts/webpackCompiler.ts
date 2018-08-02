import webpack from 'webpack';

export function webpackCompile(configs: webpack.Configuration[]) {
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
