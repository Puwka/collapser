const jwt = require('jsonwebtoken');

const secretKey = 'super secret cred';
const EXPIRES_IN = 60 * 60;

function generateJwt(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: EXPIRES_IN });
}

function verifyJwt(token) {
    return jwt.verify(token, secretKey);
}

module.exports = {
    generateJwt,
    verifyJwt
};
