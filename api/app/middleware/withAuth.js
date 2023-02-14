const jwt = require('jsonwebtoken');

const secret = process.env.API_SECRET;

const withAuth = function (req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
        res.sendStatus(401)
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
}

module.exports = withAuth;