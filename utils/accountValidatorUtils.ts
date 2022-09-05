import { NextFunction, Request, Response } from 'express';

export const getClientAddress = (req: Request): string => {
	const forwardedAdress = req.headers['x-forwarded-for'];
	if (forwardedAdress !== undefined) {
		return forwardedAdress as string;
	}
	const remoteAddresss = req.connection.remoteAddress;
	if (remoteAddresss !== undefined) {
		return remoteAddresss;
	}
	return '';
};

export const isValid = (req: Request) => {
	const clientAddress = getClientAddress(req);
	if (clientAddress === process.env.DEV_ADDRESS) {
		return true;
	}

	if (req.session!.isValid === true) {
		return true;
	}
	if (req.baseUrl.match(/^\/auth(\/callback)?/) !== null) {
		return true;
	}
	if (req.baseUrl.match(/^\/webhook/) !== null) {
		return true;
	}
	return false;
};

export const accountValidator = (req: Request, res: Response, next: NextFunction) => {
	if (!isValid(req)) {
		return res.redirect('/auth');
	}

	req.session!.timestamp = new Date().getTime();
	next();
};
