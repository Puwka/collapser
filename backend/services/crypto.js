const bcrypt = require('bcrypt');

async function compare(base, value) {
    return bcrypt.compare(base, value);
}

async function encrypt(value) {
    return bcrypt.hash(value, 10);
}


module.exports = {
    encrypt,
    compare
};
