import {
	Request,
	Response,
	NextFunction,
} from 'express';

export function accountValidator(req: Request, res: Response, next: NextFunction) {
	if(req.session.isValid || req.baseUrl.match(/^\/auth(\/callback)?/) !== null) {
		req.session.timestamp = (new Date()).getTime();
		next();
	}
	else {
		res.redirect('/auth');
	}
};
