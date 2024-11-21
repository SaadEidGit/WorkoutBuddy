const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    }
})

// static signup method
// needs to be a regurlar function and not an arrow function so we can use the 'this' keyword inside of the function
userSchema.statics.signup = async function (email, password) {
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

module.exports = mongoose.model('User', userSchema)