import * as http from 'http';

import * as Express from 'express';

import config from '../configs/webpack.client';

import middlewares from './middlewares';
import routers from './routers';

import HTML from './utils/HTML';

class Server {
	public server: http.Server;

	constructor(port: number) {
		let self = this;

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

		app.use('/', Express.static(config.output.path));

		app.get('/', (_, res) => {
			res.redirect('/i');
		});

		app.get('*', (_, res) => {
			res.send(HTML());
		});

		self.server = app.listen(port, () => {
			if(process.env.NODE_ENV !== 'test') {
				console.log(`http://localhost:${port}`);
			}
		});
	}
}

export default Server;
