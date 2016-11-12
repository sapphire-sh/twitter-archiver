'use strict';

import React from 'react';
import {
	render
} from 'react-dom';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import {
	Provider
} from 'react-redux';
import {
	createStore,
	applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

import App from './components/App';
import View from './components/View';

import 'semantic-ui-css/semantic.min.css';

import './styles/index.css';

let store = createStore(reducers, applyMiddleware(thunk));

render(
	<Provider store={store}>
		<div className="ui container">
			<Router history={hashHistory}>
				<Route path="/" component={App} />
				<Route path="/v/(:date)/(:hour)" component={View} />
			</Router>
		</div>
	</Provider>,
	document.getElementById('app')
);
