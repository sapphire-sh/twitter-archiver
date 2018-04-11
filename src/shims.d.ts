declare module '*/webpack.config';

declare namespace Express {
	interface Request {
		session: any;
	}
}
