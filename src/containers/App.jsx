'use strict';

import React, {
	Component
} from 'react';
import {
	Link
} from 'react-router';

class App extends Component {
	render() {
		const d = new Date();
		const date = d.toISOString().substr(0, 10);
		const hour = d.getHours();

		return (
			<div className="ui container">
				{this.props.children}
			</div>
		)
	}
}

export default App;
