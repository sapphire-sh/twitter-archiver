import HTML from './HTML';

describe('./utils/HTML.js', () => {
	test('HTML', () => {
		expect(HTML()).toEqual('<!DOCTYPE html><html data-reactroot=""><head><title>twitter-archiver</title><link rel="stylesheet" href="/styles.css"/></head><body><div id="app"></div><script src="/bundle.js"></script></body></html>');
	});
});