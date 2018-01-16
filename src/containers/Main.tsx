import * as React from 'react';
import {
	Link,
} from 'react-router-dom';

class Main extends React.Component {
	render() {
		const d = new Date();
		const date = d.toISOString().substr(0, 10);
		const hour = d.getHours();

		return (
			<Link to={ `/i/${date}/${hour}` }>{ `${date}/${hour}` }</Link>
		);
	}
}

export default Main;
