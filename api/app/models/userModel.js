const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true 
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
})

const saltRounds = 10

userSchema.pre('save', function(next){
    if(this.new || this.isModified('password')){
        bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
            if(err) next(err)
            else{
                this.password = hashedPassword
                next()
            }
        })
    }else{
        next()
    }
})

userSchema.methods.isPasswordCorrect = function(password, callback){
    bcrypt.compare(password, this.password, (err, same) => {
        if(err) callback(err)
        else callback(err, same)
    })
}

module.exports = mongoose.model('User', userSchema);