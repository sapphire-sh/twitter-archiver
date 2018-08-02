import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {
	clientConfig,
} from '../configs/webpack.config.client';

const compiler = webpack(clientConfig);

const server = new WebpackDevServer(compiler, config.devServer);

const port = config.devServer.port;
server.listen(port, () => {
	console.info(`http://localhost:${port}`);
});
