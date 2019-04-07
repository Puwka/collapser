module.exports = {
    development: {
        port: 3000,
        wsHost: 'localhost:3000',
        database: {
            host: 'localhost',
            name: 'collapser'
        }
    },
    production: {
        port: 3000,
        wsHost: '138.68.125.74',
        database: {
            host: 'mongo',
            name: 'collapser'
        }
    }
};
