import path from 'path';

import webpack from 'webpack';

import {
	baseConfig,
	dllPath,
} from '../configs/webpack.config.base';

export const dllConfig: webpack.Configuration = {
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
		...baseConfig.plugins!,
		new webpack.LoaderOptionsPlugin({
			'minimize': true,
		}),
		new webpack.DllPlugin({
			'name': '[name]',
			'path': path.resolve(dllPath, '[name].json') ,
		}),
	],
};
