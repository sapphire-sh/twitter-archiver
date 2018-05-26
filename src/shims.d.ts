declare const __dev: boolean;
declare const __test: boolean;
declare const __env: any;
declare const __travis: boolean;

declare namespace Express {
	interface Request {
		session: any;
	}
}
