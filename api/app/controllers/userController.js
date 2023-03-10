const User = require('../models/userModel')
const UserService = require('../services/userService')
const EmailService = require('../services/emailService')
const jwt = require('jsonwebtoken')

exports.all = (req, res) => {
    UserService.All().then((users) => {
        res.send(users.map((user) => {
            return {
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                employee: user.employee
            }
        }))
    }).catch(() => res.sendStatus(500))
}

exports.register = (req, res) => {
    UserService.Register(req).then((user) => {
        res.send({
            _id: user._id,
            email: user.email,
            employee: user.employee,
            isAdmin: user.isAdmin
        })
    }).catch((status) => {
        res.sendStatus(status)
    })
}

exports.update = (req, res) => {
    UserService.Update(req).then((user) => {
        res.send({
            _id: user._id,
            email: user.email,
            employee: user.employee,
            isAdmin: user.isAdmin
        })
    }).catch((status) => res.sendStatus(status))
}

exports.delete = (req, res) => { 
    UserService.Delete(req).then((user) => {
        res.sendStatus(200)
    }).catch(() => res.sendStatus(500))
}

exports.profile = (req, res) => {
    UserService.Profile(req).then((user) => {
        res.send({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            employee: user.employee
        })
    }).catch((status) => {
        res.sendStatus(status)
    })
}

exports.authenticate = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err){
            res.sendStatus(500)
        }else if(!user){
            res.sendStatus(401)
        }else{
            user.isPasswordCorrect(password, (err, same) => {
                if(err){
                    res.sendStatus(500)
                    console.log(err.message)
                }else if(!same){
                    res.sendStatus(401)
                }else{
                    const payload = {email}
                    const token = jwt.sign(payload, process.env.API_SECRET, {
                        'expiresIn': '1h'
                    })
                    res.cookie('token', token, {httpOnly: true, sameSite: 'none', secure: true}).sendStatus(200)
                }
            })
        }
    })
}

exports.verify = (req, res) => {
    res.status(200).send(req.email)
}

exports.admin = (req, res) => {
    res.status(200).send(req.email)
}

exports.logout = (req, res) => {
    res.clearCookie('token')
    res.sendStatus(200)
}

exports.resetPassword = (req, res) => {
    let password = ''
    const passwordLength = 8
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for(let i = 0; i < passwordLength; i++){
        password += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    UserService.ResetPassword(req, password).then(() => {
        EmailService.Send(password, req.body.email).then(() => {
            res.sendStatus(200)
        }).catch((status) => {
            res.sendStatus(status)
        })

    }).catch((status) =>{
        res.sendStatus(status)
    })
}