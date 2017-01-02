'use strict';

import React from 'react';
import { renderToString } from 'react-dom/server';

class HTML extends React.Component {
	render() {
		const { assets, component } = this.props;
		const content = component ? renderToString(component) : '';

		return (
			<html>
				<head>
					<title>twitter-archiver</title>
					<link rel="stylesheet" href={assets.styles.main} />
				</head>
				<body>
					<div id="app" dangerouslySetInnerHTML={{__html: content}} />
					<script src={assets.javascript.main} />
				</body>
			</html>
		)
	}
}

export default HTML;
