import React from 'react';
import {
	render,
} from 'react-dom';
import {
	createStore,
	applyMiddleware,
	compose,
} from 'redux';
import {
	Provider,
} from 'react-redux';
import thunk from 'redux-thunk';

import {
	reducers,
} from './reducers';

import {
	AppContainer,
} from './containers';

import './index.html';

const store = createStore(reducers, compose(...[
	applyMiddleware(thunk),
	__dev ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
],));

const AppRouter = () => {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
};

render(<AppRouter />, document.querySelector('#app'));
