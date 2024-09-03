const bookRoute = require('express').Router()
const {tokenAuthentication} = require('../middlewares/authMiddleWare')

//Import Book Controllers
const createBook = require('../controllers/bookCreation').createBook
const getBook = require('../controllers/bookCreation').getBook

bookRoute.post('/',tokenAuthentication,createBook)
bookRoute.get('/',tokenAuthentication,getBook)


module.exports = bookRoute