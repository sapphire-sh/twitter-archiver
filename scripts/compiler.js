const webpack = require('webpack');

module.exports = (configs) => {
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
};
