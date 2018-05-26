import Express from 'express';

import webpack from 'webpack';

import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import {
	clientConfig,
} from '../../configs/webpack.config.client';

const router = Express.Router();

/* istanbul ignore if */
if(__dev) {
	const compiler = webpack(clientConfig);
	router.use(WebpackDevMiddleware(compiler, {
		'logLevel': 'silent',
		'publicPath': clientConfig.output!.publicPath!,
		'serverSideRender': true,
	}));
	router.use(WebpackHotMiddleware(compiler));
}

export default router;
