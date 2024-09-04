const signUpRouter = require('express').Router()
const { validateSignup } = require('../middlewares/ValidationMiddleware')


//Importing Controllers
const createUser = require('../controllers/userSignup').createUser
const getUser = require('../controllers/userSignup').getUser



//Creating Routes here
signUpRouter.post('/signup',validateSignup,createUser)
signUpRouter.get('/',getUser)





module.exports = 
    signUpRouter
