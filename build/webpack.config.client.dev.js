import webpack from 'webpack';

import baseConfig from './webpack.config.client.base';

const config = {
	...baseConfig,
	'entry': [
		'webpack-hot-middleware/client',
		baseConfig.entry,
	],
	'plugins': [
		...baseConfig.plugins,
		new webpack.HotModuleReplacementPlugin(),
	],
};

export default config;
