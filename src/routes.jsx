'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Main from './containers/Main';
import View from './containers/View';

import NotFound from './containers/errors/NotFound';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Main} />
		<Route path="/v/(:date)/(:hour)" component={View} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;
