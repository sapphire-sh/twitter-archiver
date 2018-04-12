declare const __dev: boolean;

declare namespace Express {
	interface Request {
		session: any;
	}
}
