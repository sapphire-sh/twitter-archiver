import HTML from './HTML';

describe('./utils/HTML.ts', () => {
	test('HTML', () => {
		expect(HTML()).toEqual('<!DOCTYPE html><html data-reactroot=""><head><title>twitter-archiver</title><link rel="stylesheet" href="/styles.css"/><base target="_blank"/></head><body><div id="app"></div><script src="/bundle.js"></script></body></html>');
	});
});
