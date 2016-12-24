'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import routes from './routes';

let store = createStore(reducers, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

import 'semantic-ui-css/semantic.min.css';
import './styles/index.css';

render(
	<Provider store={store}>
		<Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
	</Provider>,
	document.getElementById('app')
);
