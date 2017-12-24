import Express from 'express';

import OAuth from '../libs/oauth';
import Database from '../libs/database';
import Twitter from '../libs/twitter';

const router = Express.Router();

router.get('/', (req, res) => {
	OAuth.initialize();
	OAuth.getRequestToken()
	.then((token) => {
		req.session.oauth = token;

		res.redirect(`https://twitter.com/oauth/authenticate?oauth_token=${token.oauth_token}`);
	})
	.catch((err) => {
		console.log(err);
		res.status(500).json(err);
	});
});

function validateOAuthToken({
	oauth_token,
	oauth_token_secret,
	oauth_verifier,
}) {
	if(oauth_token === undefined) {
		return false;
	}
	if(oauth_token_secret === undefined) {
		return false;
	}
	if(oauth_verifier === undefined) {
		return false;
	}
	return true;
}

function validateAccessToken({
	access_token,
	access_token_secret,
}) {
	if(process.env.access_token !== access_token) {
		return false;
	}
	if(process.env.access_token_secret !== access_token_secret) {
		return false;
	}
	return true;
}

router.get('/callback', (req, res) => {
	const oauth_verifier = req.query.oauth_verifier;
	req.session.oauth_verifier = oauth_verifier;

	if(validateOAuthToken(req.session)) {
		res.redirect('/');
	}
	else {
		OAuth.getAccessToken({
			'oauth_verifier': oauth_verifier,
		})
		.then((token) => {
			req.session.isValid = validateAccessToken(token);

			delete req.session.oauth;

			res.redirect('/i');
		})
		.catch((err) => {
			res.redirect('/auth');
		});
	}
});

export default router;
