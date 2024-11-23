const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require ('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    workoutPlan: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WorkoutPlan'
        }
    ]
})

// static signup method
// needs to be a regurlar function and not an arrow function so we can use the 'this' keyword inside of the function
userSchema.statics.signup = async function (email, password) {

    // validation
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    // minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    // this keyword refers to the model
    const exists = await this.findOne({ email })

    if (exists){
        throw Error('Email already in use')
    }

    // genertate salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (email, password){
    
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    // this keyword refers to the model
    const user = await this.findOne({ email })

    if (!user){
        throw Error('Incorrect email')
    }

    // comparing the password inputted by the user and the password hash in the db
    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)