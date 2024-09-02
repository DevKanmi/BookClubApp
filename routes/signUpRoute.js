const signUpRouter = require('express').Router()

//Importing Controllers
const createUser = require('../controllers/userSignup').createUser
const getUser = require('../controllers/userSignup').getUser



//Creating Routes here
signUpRouter.post('/',createUser)
signUpRouter.get('/',getUser)





module.exports = 
    signUpRouter
