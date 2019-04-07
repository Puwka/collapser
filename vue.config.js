const path = require('path');

module.exports = {
    configureWebpack: config => {
        config.entry = {
            app: [
                './frontend/src/main.js'
            ]
        };
        config.resolve = {
            ...config.resolve,
            alias: {
                '@': path.resolve(__dirname, './frontend/src'),
                vue$: 'vue/dist/vue.runtime.esm.js'
            },
            extensions: [
                '.wasm',
                '.mjs',
                '.js',
                '.jsx',
                '.vue',
                '.json'
            ],
            modules: [
                'node_modules',
                '/Users/puwka/Development/db-emulator-vue/node_modules',
                '/Users/puwka/Development/db-emulator-vue/node_modules/@vue/cli-service/node_modules'
            ]
        };
        config.devServer = {
            ...config.devServer,
            proxy: {
                '/api': {
                    target: 'http://localhost:3000'
                }
            }
        };
    }
};
