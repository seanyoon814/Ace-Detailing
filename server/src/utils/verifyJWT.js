const jwt = require('jsonwebtoken');

// ALLOWS OTHER ROUTES TO ACCESS USER INFO USING THEIR ACCESS TOKEN
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) { // Header will be 'Bearer <token>'
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if(err) {
                return res.status(403).send('Forbidden, invalid token.');
            }
            req.id = user.UserInfo.id;
            req.email = user.UserInfo.email;
            req.name = user.UserInfo.name;
            req.password = user.UserInfo.password;
            req.admin = user.UserInfo.admin;
            next();
        }
    )

};

module.exports = verifyJWT;