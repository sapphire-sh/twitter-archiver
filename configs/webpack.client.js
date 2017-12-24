import webpack from 'webpack';

import devConfig from './webpack.client.dev';
import prodConfig from './webpack.client.prod';

function getConfig(env) {
	switch(process.env.NODE_ENV) {
	case 'prod':
		return prodConfig;
	case 'dev':
	default:
		return devConfig;
	}
}

let config = getConfig(process.env.NODE_ENV);

export default config;
