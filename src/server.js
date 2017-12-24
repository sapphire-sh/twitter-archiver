import path from 'path';

import Express from 'express';

import config from '../configs/webpack.client';

import middlewares from './middlewares';
import routers from './routers';

import HTML from './utils/HTML';

class Server {
	constructor() {
		let self = this;

		const app = Express();

		if(process.env.NODE_ENV === 'prod') {
			app.set('trust proxy', 1);
		}

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

		app.get('/', (req, res) => {
			res.redirect('/i');
		});

		app.get('*', (req, res) => {
			res.send(HTML());
		});

		self.server = app.listen(process.env.PORT, () => {
			console.log(`http://localhost:${process.env.PORT}`);
		});
	}
}

export default Server;
