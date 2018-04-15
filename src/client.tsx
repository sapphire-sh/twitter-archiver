import React from 'react';
import {
	render,
} from 'react-dom';
import {
	createStore,
	combineReducers,
	applyMiddleware,
} from 'redux';
import {
	Provider,
} from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './containers/App';

const store = createStore(combineReducers({
	...reducers,
}), applyMiddleware(thunk));

if(__dev && module.hot) {
	module.hot.accept();
}

const AppRouter = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

render(<AppRouter />, document.querySelector('#app'));
