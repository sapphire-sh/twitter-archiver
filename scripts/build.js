const clientConfig = require('../configs/webpack.config.client');
const serverConfig = require('../configs/webpack.config.server');

const compiler = require('./compiler');

(async () => {
	try {
		await compiler([
			clientConfig,
			serverConfig,
		]);
	}
	catch(err) {
		console.error(err);
		process.exit(1);
	}

	console.log('done');
})();
