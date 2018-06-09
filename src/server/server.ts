import http from 'http';

import Express from 'express';

import middlewares from './middlewares';
import routers from './routers';

import {
	HTML,
} from '../shared/helpers';

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

		if(process.env.NODE_ENV !== 'test') {
			app.use('/', Express.static(__path.dist));
			app.use('/', Express.static(__path.dll));
		}

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
