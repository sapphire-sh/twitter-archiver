import http from 'http';

import Express from 'express';

import middlewares from './middlewares';
import routers from './routers';

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

		/* istanbul ignore next */
		if(__test === false) {
			app.use('/', Express.static(__path.dist));
			app.use('/', Express.static(__path.dll));
		}

		this.server = app.listen(port, () => {
			/* istanbul ignore next */
			if(__test === false) {
				console.log(`http://localhost:${port}`);
			}
		});
	}
}
