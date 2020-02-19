import babel from 'rollup-plugin-babel';

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
        babel({
            sourceMap: true,
            exclude: 'node_modules/**',
            babelrc: false,
            comments: false,
            presets: [
                ['@babel/preset-env']
            ]
        })
    ]
};
