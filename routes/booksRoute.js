const bookRoute = require('express').Router()
const {tokenAuthentication} = require('../middlewares/authMiddleWare')

//Import Book Controllers
const createBook = require('../controllers/bookCreation').createBook
const getBook = require('../controllers/bookCreation').getBook
const updateBook = require('../controllers/bookCreation').updateBook
const deleteBook = require('../controllers/bookCreation').deleteBook
const findOneBook = require('../controllers/bookCreation').findOneBook




bookRoute.post('/',tokenAuthentication,createBook)
bookRoute.get('/',tokenAuthentication,getBook)
bookRoute.patch('/:id',tokenAuthentication,updateBook)
bookRoute.delete('/:id', tokenAuthentication,deleteBook)
bookRoute.get('/:id',tokenAuthentication,findOneBook)


module.exports = bookRoute