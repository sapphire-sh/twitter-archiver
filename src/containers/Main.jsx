'use strict';

import React from 'react';
import { Link } from 'react-router';

class Main extends React.Component {
	render() {
		const d = new Date();
		const date = d.toISOString().substr(0, 10);
		const hour = d.getHours();

		return (
			<Link to={ `/v/${date}/${hour}` }>{ `${date}/${hour}` }</Link>
		)
	}
}

export default Main;
