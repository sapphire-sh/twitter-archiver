import * as Express from 'express';

import OAuth, {
	RequestToken,
	AccessToken,
} from '../libs/oauth';

const router = Express.Router();

router.get('/', (req, res) => {
	const session = req.session!;

	OAuth.getRequestToken()
	.then((token) => {
		session.oauth = token;

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
}: RequestToken, oauth_verifier: string) {
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
}: AccessToken) {
	if(process.env.access_token !== access_token) {
		return false;
	}
	if(process.env.access_token_secret !== access_token_secret) {
		return false;
	}
	return true;
}

router.get('/callback', (req, res) => {
	const session = req.session!;

	const oauth_verifier = req.query.oauth_verifier;

	if(validateOAuthToken({
		'oauth_token': session.oauth_token,
		'oauth_token_secret': session.oauth_token_secret,
	}, oauth_verifier)) {
		res.redirect('/');
	}
	else {
		OAuth.getAccessToken({
			'oauth_verifier': oauth_verifier,
		})
		.then((token) => {
			session.isValid = validateAccessToken(token);

			delete session.oauth;

			res.redirect('/i');
		})
		.catch((err) => {
			console.error(err);
			res.redirect('/auth');
		});
	}
});

export default router;
