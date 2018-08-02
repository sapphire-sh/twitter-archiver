const path = require('path');

const webpack = require('webpack');

const {
	baseConfig,
	dllPath,
} = require('../configs/webpack.config.base');

module.exports = {
	...baseConfig,
	'entry': {
		'react': [
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'redux-thunk',
			'semantic-ui-css',
			'semantic-ui-react',
		],
	},
	'output': {
		'filename': '[name].dll.js',
		'path': dllPath,
		'library': '[name]',
	},
	'plugins': [
		...baseConfig.plugins,
		new webpack.LoaderOptionsPlugin({
			'minimize': true,
		}),
		new webpack.DllPlugin({
			'name': '[name]',
			'path': path.resolve(dllPath, '[name].json') ,
		}),
	],
};
