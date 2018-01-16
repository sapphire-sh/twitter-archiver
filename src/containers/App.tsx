import * as React from 'react';
import {
	Switch,
	Route,
} from 'react-router-dom';

import Main from './Main';
import View from './View';

import NotFound from './errors/NotFound';

import 'semantic-ui-css/semantic.min.css';
import '../styles/index.css';

class App extends React.Component {
	render() {
		return (
			<div className="ui container">
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/i/:date/:hour" component={View} />

					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		);
	}
}

export default App;
