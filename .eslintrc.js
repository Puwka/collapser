module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 'off',
        'no-param-reassign': 'off',
        'comma-dangle': 'off',
        indent: ['error', 4],
        'consistent-return': 'off',
        'no-underscore-dangle': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
