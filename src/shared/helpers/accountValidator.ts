import {
	Request,
	Response,
	NextFunction,
} from 'express';

function getClientAddress(req: Request): string {
	const forwardedAdress = req.headers['x-forwarded-for'];
	if(forwardedAdress !== undefined) {
		return forwardedAdress as string;
	}
	const remoteAddresss = req.connection.remoteAddress;
	if(remoteAddresss !== undefined) {
		return remoteAddresss;
	}
	return '';
}

function isValid(req: Request) {
	const clientAddress = getClientAddress(req);
	if(clientAddress === __env.DEV_ADDRESS) {
		return true;
	}

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
	if(isValid(req)) {
		req.session!.timestamp = (new Date()).getTime();
		next();
	}
	else {
		res.redirect('/auth');
	}
}
