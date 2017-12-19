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
import {
	createBrowserHistory,
} from 'history';
import {
	ConnectedRouter,
	routerReducer,
	routerMiddleware,
} from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './containers/App';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const store = createStore(combineReducers({
	...reducers,
	'router': routerReducer,
}), applyMiddleware(middleware, thunk));

if(module.hot) {
	module.hot.accept();
}

const AppRouter = () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	);
};

render(<AppRouter />, document.querySelector('#app'));
