import Express from 'express';

import webpack from 'webpack';

import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import {
	getClientConfig,
} from '../../configs/webpack.config.client';

const router = Express.Router();

/* istanbul ignore if */
if(__dev) {
	getClientConfig('dev').then((config) => {
		const compiler = webpack(config);
		router.use(WebpackDevMiddleware(compiler, {
			'logLevel': 'silent',
			'publicPath': config.output!.publicPath!,
			'serverSideRender': true,
		}));
		router.use(WebpackHotMiddleware(compiler));
	});
}

export default router;
