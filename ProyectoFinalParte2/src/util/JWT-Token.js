const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.PRIVATE_KEYJWT

exports.generateToken = (user) => {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
}

exports.verifyToken = (token) => {
    return jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if (err) {return {error:"invalid token"}}
        return decoded
    });
}
