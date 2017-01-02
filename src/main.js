'use strict';

require('babel-register');

const path = require('path');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
.server(path.resolve(__dirname, '..'), () => {
	require('./server');
});
