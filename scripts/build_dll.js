const fs = require('fs');

const compiler = require('./compiler');

const {
	dllPath,
} = require('../configs/webpack.config.base');

const config = require('../configs/webpack.config.dll');

try {
	fs.statSync(dllPath);
	console.log(`dll directory already exists`);
}
catch(err) {
	if(err.code === 'ENOENT') {
		compiler([
			config,
		]).then(() => {
			console.log('done');
		}).catch((err) => {
			console.error(err);
			process.exit(1);
		});
	}
}
