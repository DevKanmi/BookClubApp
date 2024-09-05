const threadRoute = require('express').Router()
const { getAllThreads } = require('../controllers/forumDiscussion')
const {tokenAuthentication} = require('../middlewares/authMiddleWare')
const createThread = require('../controllers/forumDiscussion').createThread
const replyToThread =require('../controllers/forumDiscussion').replyToThread
const getThreadForBook = require('../controllers/forumDiscussion').getThreadForBook
const deleteAThread = require('../controllers/forumDiscussion').deleteAThread


//Routes  Implementation
threadRoute.post('/create',tokenAuthentication,createThread)
threadRoute.post('/:id/reply',tokenAuthentication,replyToThread)
threadRoute.get('/:BookId', getThreadForBook)
threadRoute.delete('/:id',tokenAuthentication,deleteAThread)
threadRoute.get('/',getAllThreads)






module.exports = threadRoute
