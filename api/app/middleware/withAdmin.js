const jwt = require('jsonwebtoken');

const secret = process.env.API_SECRET;

const UserService = require('../services/userService')

const withAdmin = function (req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
        res.sendStatus(401)
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                UserService.IsAdmin(decoded.email).then((isAdmin) => {
                    if(isAdmin){
                        req.email = decoded.email
                        next()
                    }else{
                        res.sendStatus(401)
                    }
                }).catch(() => res.sendStatus(500))
            }
        });
    }
}

module.exports = withAdmin;