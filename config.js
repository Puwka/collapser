module.exports = {
    development: {
        port: 3000,
        database: {
            host: 'localhost',
            name: 'collapser'
        }
    },
    production: {
        port: 3000,
        database: {
            host: 'mongo',
            name: 'collapser'
        }
    }
};
