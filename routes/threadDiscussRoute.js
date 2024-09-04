const threadRoute = require('express').Router()
const {tokenAuthentication} = require('../middlewares/authMiddleWare')
const createThread = require('../controllers/forumDiscussion').createThread
const replyToThread =require('../controllers/forumDiscussion').replyToThread
const getThreadForBook = require('../controllers/forumDiscussion').getThreadForBook

threadRoute.post('/create',tokenAuthentication,createThread)
threadRoute.post('/:id/reply',tokenAuthentication,replyToThread)
threadRoute.get('/:BookId', getThreadForBook)






module.exports = threadRoute
