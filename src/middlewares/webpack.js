import Express from 'express';

import webpack from 'webpack';

import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import config from '../../configs/webpack.client.dev';

const router = Express.Router();

/* istanbul ignore if */
if(process.env.NODE_ENV === 'dev') {
	const compiler = webpack(config);
	router.use(WebpackDevMiddleware(compiler, {
		'noInfo': true,
		'quiet': true,
		'publicPath': config.output.publicPath,
	}));
	router.use(WebpackHotMiddleware(compiler));
}

export default router;
