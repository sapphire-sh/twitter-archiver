import http from 'http';

import Express from 'express';

import {
	distPath,
} from '../configs/webpack.config.base';
import {
	dllPath,
} from '../configs/webpack.config.dll';

import middlewares from './middlewares';
import routers from './routers';

import {
	HTML,
} from './helpers';

export class Server {
	public server: http.Server;

	constructor(port: number) {
		const app = Express();

		middlewares.forEach((middleware) => {
			app.use(middleware);
		});

		routers.forEach(({
			path,
			router,
		}) => {
			app.use(path, router);
		});

		app.use('/', Express.static(distPath));
		app.use('/', Express.static(dllPath));

		app.get('*', (_, res) => {
			res.send(HTML);
		});

		this.server = app.listen(port, () => {
			if(process.env.NODE_ENV !== 'test') {
				console.log(`http://localhost:${port}`);
			}
		});
	}
}
