import {
	Request,
	Response,
	NextFunction,
} from 'express';

function isValid(req: Request) {
	if(req.session!.isValid === true) {
		return true;
	}
	if(req.baseUrl.match(/^\/auth(\/callback)?/) !== null) {
		return true;
	}
	if(req.baseUrl.match(/^\/webhook/) !== null) {
		return true;
	}
	return false;
}

export function accountValidator(req: Request, res: Response, next: NextFunction) {
	next();
	return;
	if(isValid(req)) {
		req.session!.timestamp = (new Date()).getTime();
		next();
	}
	else {
		res.redirect('/auth');
	}
};
