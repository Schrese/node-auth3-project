const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.status(401).json({ message: 'Fancy meeting you here' })
            } else {
                req.user = decodedToken.user;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "Shhhhh, I don't think we're allowed in here" })
    }
}