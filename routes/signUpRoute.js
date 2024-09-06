const signUpRouter = require('express').Router()
const { validateSignup } = require('../middlewares/ValidationMiddleware')


//Importing Controllers
const {createUser,getUser} = require('../controllers/userSignup')



//Creating Routes here
signUpRouter.post('/signup',validateSignup,createUser)
signUpRouter.get('/',getUser)





module.exports = 
    signUpRouter
