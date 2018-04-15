import React from 'react';

import View from './View';

import 'semantic-ui-css/semantic.min.css';
import '../styles/index.css';

class App extends React.Component {
	render() {
		return (
			<div className="ui container">
				<View />
			</div>
		);
	}
}

export default App;
