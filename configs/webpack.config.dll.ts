import * as path from 'path';

import * as webpack from 'webpack';

import {
	baseConfig,
	outputPath,
} from './webpack.config.base';

export const dllConfig: webpack.Configuration = {
	...baseConfig,
	'entry': {
		'react': [
			'react',
			'react-dom',
			'react-redux',
			'react-router-dom',
			'react-router-redux',
			'redux',
			'redux-thunk',
		],
	},
	'output': {
		'filename': '[name].dll.js',
		'path': outputPath,
		'library': '[name]',
	},
	'plugins': [
		new webpack.DllPlugin({
			'name': '[name]',
			'path': path.resolve(outputPath, '[name].json') ,
		})
	],
};

export default dllConfig;
