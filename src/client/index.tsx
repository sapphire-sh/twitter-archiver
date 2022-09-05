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

const middlewares = [
	applyMiddleware(thunk),
];
if (__dev) {
	middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = createStore(reducers, compose(...middlewares) as any);

const AppRouter: React.FC = () => {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
};

render(<AppRouter />, document.querySelector('#app'));
