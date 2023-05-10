declare module 'oauth' {
  export class OAuth {
    constructor(
      requestUrl: string,
      accessUrl: string,
      consumerKey: string,
      consumerSecret: string,
      version: string,
      authorize_callback: string | null,
      signatureMethod: string
    );

    getOAuthRequestToken(
      callback: (error: string, oauthToken: string, oauthTokenSecret: string, results: string) => void
    ): void;

    getOAuthAccessToken(
      oauth_token: string,
      oauth_token_secret: string,
      oauth_verifier: string,
      callback: (
        error: string,
        oauthToken: string,
        oauthTokenSecret: string,
        results: {
          id: string;
          screen_name: string;
        }
      ) => void
    ): void;
  }
}
