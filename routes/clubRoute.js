const clubRoute = require('express').Router()
const { tokenAuthentication } =  require('../middlewares/authMiddleWare')

const {createClub,getAllClubs,joinClub,getPendingRequests,requestAccept,requestStatus} = require('../controllers/clubcreation')
const{createEvent, viewEvents,deleteEvent} = require('../controllers/eventCreation')

clubRoute.post('/create',tokenAuthentication,createClub)
clubRoute.get('/',getAllClubs)
clubRoute.post('/:id/join',tokenAuthentication,joinClub)
clubRoute.get('/:id/requests',tokenAuthentication,getPendingRequests)
clubRoute.post('/:id/requests',tokenAuthentication,requestAccept)
clubRoute.get('/:id/join/status',tokenAuthentication,requestStatus)

//Creating Events in Club
clubRoute.post('/:id/createEvent',tokenAuthentication, createEvent)
clubRoute.get('/:id/viewEvents',tokenAuthentication,viewEvents)
clubRoute.delete('/:id/deleteEvent', tokenAuthentication,deleteEvent)







module.exports = clubRoute