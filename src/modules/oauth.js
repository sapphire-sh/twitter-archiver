import Express from 'express';
import session from 'express-session';

import Twit from 'twit';

import Stream from './stream';
import Database from './database';

import {
	OAuth,
} from 'oauth';
import config from '../../config';

const oauth = new OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	config.consumer_key,
	config.consumer_secret,
	'1.0A',
	null,
	'HMAC-SHA1',
);

const router = Express.Router();

router.use(session({
	'secret': 'sapphire',
	// 'cookie': {
		// 'maxAge': 3600,
		// 'httpOnly': true,
		// 'secure': true,
	// },
	'resave': false,
	'saveUninitialized': false,
	// 'unset': 'destroy',
}));

router.get('/', (req, res) => {
	oauth.getOAuthRequestToken((err, oauth_token, oauth_token_secret) => {
		if(err) {
			console.log(err);
			res.status(500).json(err);
		}
		else {
			req.session.oauth = {
				'oauth_token': oauth_token,
				'oauth_token_secret': oauth_token_secret,
			};
			console.log(req.session.oauth);
			res.redirect(`https://twitter.com/oauth/authenticate?oauth_token=${oauth_token}`);
		}
	});
});

router.get('/callback', (req, res) => {
	console.log(req.session.oauth);
	if(req.session.oauth) {
		const {
			oauth_verifier,
		} = req.query;

		Object.assign(req.session.oauth, {
			'oauth_verifier': oauth_verifier,
		});

		const {
			oauth_token,
			oauth_token_secret,
		} = req.session.oauth;

		oauth.getOAuthAccessToken(
			oauth_token,
			oauth_token_secret,
			oauth_verifier,
			(err, access_token, access_token_secret) => {
				if(err) {
					console.log(err);
					res.status(500).json(err);
				}
				else {
					Object.assign(req.session.oauth, {
						'access_token': access_token,
						'access_token_secret': access_token_secret,
					});

					const twit = new Twit(Object.assign({}, config, req.session.oauth));

					const database = new Database({
						'url': 'mongodb://localhost/twitter-archiver',
					});
					const stream = new Stream({
						twit,
						database,
					});

					stream.start();

					console.log(req.session.oauth);

					res.redirect('/');
				}
			}
		);
	}
	else {
		res.redirect('/');
	}
});

export default router;
