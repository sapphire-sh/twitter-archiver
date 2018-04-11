import {
	Server,
} from './server';

import {
	OAuth,
	Twitter,
} from './libs';

const token = {
	'consumer_key': process.env.consumer_key!,
	'consumer_secret': process.env.consumer_secret!,
	'access_token': process.env.access_token!,
	'access_token_secret': process.env.access_token_secret!,
};

OAuth.initialize(token.consumer_key, token.consumer_secret);
Twitter.initialize(token);

const port = process.env.PORT === undefined ? 8015 : parseInt(process.env.PORT!);

const server = new Server(port);
