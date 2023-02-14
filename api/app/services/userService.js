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
                if(!user) reject()
                else if(!user.employee) reject()
                else{
                    user.populate({path: 'employee', populate: {path: 'sales', populate: 'car'}}).then((user) => {
                        resolve(user)
                    })
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
                user.populate('employee').then((user) => resolve(user))
            }).catch(() => reject())
        })
    },

    Update: (req) => {
        return new Promise((resolve, reject) => {
            const {email, password, employee, isAdmin, id} = req.body;
            console.log(email, password, employee, isAdmin, id)
            User.findById(id).then((user) => {

                if(!user){
                    reject()
                }else{
                    user.email = email

                    if(password){
                        user.password = password
                    }
                    
                    user.employee = employee
                    user.isAdmin = isAdmin

                    user.save().then((user) => {
                        user.populate('employee').then((user) => resolve(user))
                    }).catch((err) => {
                        reject()
                    });
                }
            }).catch((err) => {
                reject()
            })
        })
    },

    Delete: (req) => {
        return User.findByIdAndDelete(req.body.id)
    }
}

module.exports = UserService