import config from './rollup';

// ES output
config.output.format = 'es';
config.output.file = 'dist/ctime.mjs';

// remove memory() plugin
config.plugins.splice(0, 1);

export default config;
