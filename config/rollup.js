import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import memory from 'rollup-plugin-memory';

export default {
	input: 'src/ctime.js',
	output: {
		format: 'iife',
		file: 'dist/ctime.dev.js',
		name: 'ctime',
		sourcemap: true,
		strict: true
	},
	plugins: [
		memory({
			path: 'src/ctime.js',
			contents: `
				import ctime from './ctime';
				if (typeof module!='undefined') module.exports = ctime;
				else self.ctime = ctime;
			`
		}),
		nodeResolve({
			main: true
		}),
		babel({
			sourceMap: true,
			exclude: 'node_modules/**',
			babelrc: false,
			comments: false,
			presets: [
				['env', {
					modules: false,
					loose: true,
					exclude: ['transform-es2015-typeof-symbol'],
					targets: {
						browsers: ['last 2 versions', 'IE >= 9']
					}
				}]
			]
		})
	]
};
