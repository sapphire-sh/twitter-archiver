import React from 'react';
import {
	renderToString,
} from 'react-dom/server';

class HTML extends React.Component {
	render() {
		return (
			<html>
				<head>
					<title>sapphire.bot</title>
					<link rel="stylesheet" href="/styles.css" />
				</head>
				<body>
					<div id="app"></div>
					<script src="/bundle.js"></script>
				</body>
			</html>
		);
	}
}

export default () => {
	return `<!DOCTYPE html>${renderToString(<HTML />)}`;
};
