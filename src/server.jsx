'use strict';

import path from 'path';

import { Server } from 'http';
import Express from 'express';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import HTML from './helpers/HTML';

import reducers from './reducers';
import routes from './routes';

import Twit from 'twit';

import Stream from './modules/stream';
import Database from './modules/database';

import { hydrateTweet } from './helpers';

import CONFIG from '../config';

const twit = new Twit(CONFIG);

const database = new Database({
	url: 'mongodb://localhost/twitter-archiver'
});
const stream = new Stream({
	twit,
	database
});

stream.start();

const app = new Express();
const server = new Server(app);

app.use('/', Express.static(path.resolve(__dirname, '../dist')));

app.get('/api/tweets/:date/:hour', (req, res) => {
	let date = new Date(`${req.params.date} ${req.params.hour}:00:00`);

	database.fetchTweets(date.getTime())
	.then((tweets) => {
		res.json(tweets.map(hydrateTweet));
	})
	.catch(err => res.json(err));
});

app.get('*', (req, res) => {
	const memoryHistory = createHistory(req.originalUrl);
	const store = createStore(reducers, applyMiddleware(thunk));
	const history = syncHistoryWithStore(memoryHistory, store);

	match({ history, routes, location: req.url }, (err, redirectLocation, renderProps) => {
		if(err) {
			return res.status(500).send(err.message);
		}
		else if(redirectLocation) {
			return res.redirect(redirectLocation.pathname, redirectLocation.search);
		}
		else if(renderProps) {
			const component = (
				<Provider store={store}>
					<RouterContext {...renderProps} />
				</Provider>
			);

			res.status(200).send(`<!DOCTYPE html>\n${renderToString(<HTML assets={webpackIsomorphicTools.assets()} component={component} />)}`);
		}
		else {
			res.status(404).send(404);
		}
	});
});

const port = process.env.PORT || 8015;

server.listen(port, (err) => {
	if(err) {
		return console.error(err);
	}
	console.info(`http://localhost:${port}`);
});
