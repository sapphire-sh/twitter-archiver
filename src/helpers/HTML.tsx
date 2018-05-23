import React from 'react';

import {
	renderToString,
} from 'react-dom/server';

class HTMLTemplate extends React.Component {
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
					<script src="/react.dll.js"></script>
					<script src="/bundle.js"></script>
				</body>
			</html>
		);
	}
}

export const HTML = `<!DOCTYPE html>${renderToString(<HTMLTemplate />)}`;
