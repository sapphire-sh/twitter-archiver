import Express from 'express';
import { AccessToken, OAuth, RequestToken } from '~/server/libs';

const router = Express.Router();

router.get('/', async (req, res) => {
  try {
    const token = await OAuth.getRequestToken();
    req.session!.oauth = token;

    res.redirect(`https://twitter.com/oauth/authenticate?oauth_token=${token.oauth_token}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

function validateOAuthToken(requestToken: RequestToken, oauth_verifier: string) {
  const { oauth_token, oauth_token_secret } = requestToken;

  if (oauth_token === undefined) {
    return false;
  }
  if (oauth_token_secret === undefined) {
    return false;
  }
  if (oauth_verifier === undefined) {
    return false;
  }
  return true;
}

function validateAccessToken(token: AccessToken) {
  const { access_token, access_token_secret } = token;

  if (__env.ACCESS_TOKEN !== access_token) {
    return false;
  }
  if (__env.ACCESS_TOKEN_SECRET !== access_token_secret) {
    return false;
  }
  return true;
}

router.get('/callback', async (req, res) => {
  function getOAuthVerifier(): string {
    const value = req.query.oauth_verifier;
    if (typeof value === 'string') {
      return value;
    }
    return '';
  }

  const oauth_verifier = getOAuthVerifier();

  const { oauth_token, oauth_token_secret } = req.session!;

  if (
    validateOAuthToken(
      {
        oauth_token,
        oauth_token_secret,
      },
      oauth_verifier
    )
  ) {
    res.redirect('/');
    return;
  }

  try {
    const token = await OAuth.getAccessToken({
      oauth_verifier,
    });
    req.session!.isValid = validateAccessToken(token);

    delete req.session!.oauth;

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/auth');
  }
});

export default router;
