import * as path from 'path';

import * as webpack from 'webpack';

import {
	getBaseConfig,
	outputPath,
} from './webpack.config.base';

export {
	outputPath,
}

export function getDllConfig(mode: string) {
	return getBaseConfig(mode).then((baseConfig) => {
		const dllConfig: webpack.Configuration = {
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
				...baseConfig.plugins!,
				new webpack.LoaderOptionsPlugin({
					'minimize': true,
				}),
				new webpack.DllPlugin({
					'name': '[name]',
					'path': path.resolve(outputPath, '[name].json') ,
				}),
			],
		};

		return Promise.resolve(dllConfig);
	});
}
