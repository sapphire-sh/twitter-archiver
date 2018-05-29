import React from 'react';
import {
	render,
} from 'react-dom';
import {
	createStore,
	applyMiddleware,
} from 'redux';
import {
	Provider,
} from 'react-redux';
import thunk from 'redux-thunk';

import {
	reducers,
} from './reducers';

import App from './containers/App';

const store = createStore(reducers, applyMiddleware(thunk));

const AppRouter = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

render(<AppRouter />, document.querySelector('#app'));
