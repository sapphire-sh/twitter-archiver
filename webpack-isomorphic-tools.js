'use strict';

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
	assets: {
		images: {
			extensions: [
				'jpeg',
				'jpg',
				'png',
				'gif'
			],
			parser: WebpackIsomorphicToolsPlugin.url_loader_parser
		},
		fonts: {
			extensions: [
				'woff',
				'woff2',
				'ttf',
				'eot'
			],
			parser: WebpackIsomorphicToolsPlugin.url_loader_parser
		},
		svg: {
			extension: 'svg',
			parser: WebpackIsomorphicToolsPlugin.url_loader_parser
		},
		style_modules: {
			extensions: ['css'],
			filter(module, regex, options, log) {
				return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
			},
			path(module, options, log) {
				return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
			},
			parser(module, options, log) {
				return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
			}
		}
	}
};
