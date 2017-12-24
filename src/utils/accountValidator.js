export default (req, res, next) => {
	if(req.session.isValid || req.baseUrl.match(/^\/auth(\/callback)?/) !== null) {
		next();
	}
	else {
		res.redirect('/auth');
	}
};
