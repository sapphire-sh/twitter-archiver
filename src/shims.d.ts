declare const __dev: boolean;
declare const __test: boolean;
declare const __env: any;
declare const __path: {
	dist: string;
	dll: string;
};
declare module '*.json' {
	import {
		Twitter,
	} from 'twit';

	const value: Twitter.Status;
	export = value;
}
