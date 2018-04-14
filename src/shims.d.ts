declare const __dev: boolean;
declare const __env: any;

declare namespace Express {
	interface Request {
		session: any;
	}
}
