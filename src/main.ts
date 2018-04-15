import {
	Server,
} from './server';

import {
	OAuth,
	Twitter,
} from './libs';

const token = {
	'consumer_key': __env.consumer_key,
	'consumer_secret': __env.consumer_secret,
	'access_token': __env.access_token,
	'access_token_secret': __env.access_token_secret,
};

OAuth.initialize(token.consumer_key, token.consumer_secret);
Twitter.initialize(token);

const port = __env.PORT === undefined ? 8015 : parseInt(__env.PORT!);

const server = new Server(port);
