const bookRoute = require('express').Router()
const {tokenAuthentication} = require('../middlewares/authMiddleWare')

//Import Book Controllers
const {createBook,getBook,updateBook,deleteBook,findOneBook, updateBookHighlights} = require('../controllers/bookCreation')




bookRoute.post('/',tokenAuthentication,createBook)
bookRoute.get('/',tokenAuthentication,getBook)
bookRoute.patch('/:id',tokenAuthentication,updateBook)
bookRoute.delete('/:id', tokenAuthentication,deleteBook)
bookRoute.get('/:id',tokenAuthentication,findOneBook)
bookRoute.post('/:id/highlights',tokenAuthentication,updateBookHighlights)



module.exports = bookRoute