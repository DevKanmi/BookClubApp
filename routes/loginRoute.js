const loginRouter = require('express').Router()

//Import Controller

const userLogin = require('../controllers/userLogin').userLogin


loginRouter.post('/',userLogin)



module.exports = loginRouter