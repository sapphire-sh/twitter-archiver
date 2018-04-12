import * as path from 'path';

import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

export const baseConfig: webpack.Configuration = {
	'devtool': '#source-map',
	'resolve': {
		'extensions': [
			'.ts',
			'.tsx',
			'.js',
			'.json',
		],
	},
	'mode': process.env.NODE_ENV === 'development' ? 'development' : 'production',
};

export const outputPath = path.resolve(__dirname, '../dist');
