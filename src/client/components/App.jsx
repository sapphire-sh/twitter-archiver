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
			<Link to={ `/v/${date}/${hour}` }>{ `${date}/${hour}` }</Link>
		)
	}
}

export default App;
