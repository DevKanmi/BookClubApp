const mongoose = require('mongoose')

const SignupSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    name:{
        type: String,
        required:true,
        unique: true
    },
    passwordHash: String
})

SignupSchema.set('toJSON', {
    transform:(document,returnedObject) =>{
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User',SignupSchema)

module.exports = User
 