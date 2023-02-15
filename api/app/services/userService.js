const User = require('../models/userModel')

const UserService = {

    IsAdmin: (email) => {
        return new Promise((resolve, reject) => {
            User.findOne({email: email}).then((user) => {
                resolve(user.isAdmin)
            }).catch(() => reject())
        })
    },

    All: () => {
        return User.find().populate('employee')
    },

    Profile: (req) => {
        return new Promise((resolve, reject) => {
            User.findOne({email: req.email}).then((user) => {
                if(!user) reject(404)
                else if(!user.employee) reject(401)
                else{
                    user.populate({path: 'employee', populate: {path: 'sales', populate: 'car'}}).then((user) => {
                        resolve(user)
                    }).catch(() => reject(500))
                }
            })
        })
    },

    Register: (req) => {
        const {email, password, employee, isAdmin} = req.body;
        
        const user = new User({
            email: email,
            password: password,
            employee: employee,
            isAdmin: isAdmin
        })

        return new Promise((resolve, reject) => {
            user.save().then((user) => {
                user.populate('employee').then((user) => resolve(user)).catch(() => reject(500))
            }).catch(() => reject(400))
        })
    },

    Update: (req) => {
        return new Promise((resolve, reject) => {
            const {email, password, employee, isAdmin, id} = req.body;
            User.findById(id).then((user) => {

                if(!user){
                    reject(404)
                }else{
                    user.email = email

                    if(password){
                        user.password = password
                    }
                    
                    user.employee = employee
                    user.isAdmin = isAdmin

                    user.save().then((user) => {
                        user.populate('employee').then((user) => resolve(user)).catch(() => reject(500))
                    }).catch(() => {
                        reject(400)
                    });
                }
            }).catch(() => {
                reject(500)
            })
        })
    },

    Delete: (req) => {
        return User.findByIdAndDelete(req.body.id)
    },

    ResetPassword: (req, password) => {

        return new Promise((resolve, reject) => {
            User.findOne({email: req.body.email}).then((user) => {
                if(!user){
                    reject(404)
                }else{
                    user.password = password
                    user.save().then((updated) => {
                        resolve()
                    }).catch((err) => {
                        console.log(err)
                        reject(500)
                    })
                }

            }).catch((err) => {
                console.log(err)
                reject(500)
            })
        })
    }
}

module.exports = UserService