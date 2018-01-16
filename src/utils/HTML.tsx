import * as React from 'react';
import {
	renderToString,
} from 'react-dom/server';

class HTML extends React.Component {
	render() {
		return (
			<html>
				<head>
					<title>twitter-archiver</title>
					<link rel="stylesheet" href="/styles.css" />
					<base target="_blank" />
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
