const clientConfig = require('../configs/webpack.config.client');
const serverConfig = require('../configs/webpack.config.server');

const compiler = require('./compiler');

compiler([
	clientConfig,
	serverConfig,
]).then(() => {
	console.log('done');
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
