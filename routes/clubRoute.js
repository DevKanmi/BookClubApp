const clubRoute = require('express').Router()
const { tokenAuthentication } =  require('../middlewares/authMiddleWare')

const {createClub,getAllClubs,joinClub,getPendingRequests,requestAccept} = require('../controllers/clubcreation')

clubRoute.post('/create',tokenAuthentication,createClub)
clubRoute.get('/',getAllClubs)
clubRoute.post('/:id/join',tokenAuthentication,joinClub)
clubRoute.get('/:id/requests',tokenAuthentication,getPendingRequests)
clubRoute.post('/:id/requests',tokenAuthentication,requestAccept)









module.exports = clubRoute