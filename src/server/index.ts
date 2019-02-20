import {
	Server,
} from './server';

import {
	Database,
	Downloader,
	OAuth,
	Socket,
	Twitter,
} from '~/server/libs';

const token = {
	'consumer_key': __env.consumer_key,
	'consumer_secret': __env.consumer_secret,
	'access_token': __env.access_token,
	'access_token_secret': __env.access_token_secret,
};

const port = __env.PORT === undefined ? 8015 : parseInt(__env.PORT!, 10);

const app = new Server(port);

(async () => {
	try {
		await Promise.all([
			Database.initialize(),
			// Downloader.initialize(),
			OAuth.initialize(token.consumer_key, token.consumer_secret),
			Socket.initialize(app.server),
			Twitter.initialize(token),
		]);
	}
	catch(error) {
		console.log('initialized failed');
		throw error;
	}

	try {
		await Promise.all([
			Database.start(),
			// Downloader.start(),
			Twitter.start(),
		]);
	}
	catch(error) {
		console.log('start failed');
		throw error;
	}
})();
