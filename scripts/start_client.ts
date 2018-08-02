import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {
	clientConfig,
} from '../configs/webpack.config.client';

function start(config: webpack.Configuration) {
	const compiler = webpack(config);

	const server = new WebpackDevServer(compiler, config.devServer!);

	const port = config.devServer!.port!;
	server.listen(port, () => {
		console.info(`http://localhost:${port}`);
	});
}

start(clientConfig);
