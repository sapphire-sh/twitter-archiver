import {
	Request,
	Response,
	NextFunction,
} from 'express';

export function accountValidator(req: Request, res: Response, next: NextFunction) {
	if(req.session.isValid || req.baseUrl.match(/^\/auth(\/callback)?/) !== null) {
		next();
	}
	else {
		res.redirect('/auth');
	}
};
