'use strict';

import Server from './libs/server';
import Stream from './libs/stream';
import Database from './libs/database';

class App {
	start() {
		Promise.all([
			Server.initialize(),
			Stream.initialize(),
			Database.initialize({
				dialect: 'sqlite',
				logging: false,
				storage: './database.sqlite'
			})
		])
		.then(() => {
			Server.start();
			Stream.start();
		});
	}
}

const app = new App();
app.start();

export default App;
