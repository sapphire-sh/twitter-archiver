const tsc = require('typescript');
const config = require('./tsconfig.json');

module.exports = {
	process(src, path) {
		if(path.endsWith('.ts') || path.endsWith('.tsx')) {
			return tsc.transpile(src, config.compilerOptions, path, []);
		}
		return src;
	},
};
