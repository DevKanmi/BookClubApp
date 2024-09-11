const Event = require('../models/eventSchema')
const Club = require('../models/clubSchema')
const User = require('../models/signUpSchema')
const { getAllClubs } = require('./clubcreation')
const { response } = require('express')

const createEvent = async(request, response) =>{
    const { title,description,duration} = request.body
    const organizerId = request.user.id
    const clubId = request.params.id
    
    try{
        const user = await User.findById(organizerId)
        if(!user) return response.status(401).json({error: "User not found."})

        const club = await Club.findById(clubId)
        if(!club.members.includes(user._id.toString())) return response.status(401).json({error:`${user.username} can't Create Event, Not a Member of the Club.`})
        
        const event = new Event({
            title,
            description,
            organizer: user._id,
            club: club._id,
            participants:club.members,
            duration,

        })

        const newEvent = await event.save()
        club.events = club.events.concat(event._id)
        await club.save()
        response.status(201).json({
            message: "New Event Created",
            newEvent
        })
        
    }

    catch(error){
        response.status(500).json({error:"Something Went wrong!"})
    }
}

const viewEvents = async(request, response) =>{
    const userId = request.user.id
    const clubId = request.params.id
    try{
    const club = await Club.findById(clubId).populate('events')
    if(!club.members.includes(userId.toString())) return response.status(401).json({error:"Not a Member, Can't View Events!"})
    if(club.events.length === 0) return response.status(400).json({message :"There are no Events available!"})
    
    response.status(200).json(club.events)
    }
    catch(error){
        response.status(500).json({error:"Something Went Wrong!"})
    }
}

const deleteEvent = async(request,response) => {
    const {eventId} = request.body
    const userId = request.user.id
    const clubId = request.params.id
    try{
        //Checks If User Exists
        const user = await User.findById(userId)
        if(!user) return response.status(404).json({error: "User was not found!"})
        
        //Find Event and ensure only User that Organized can delete
        const event = await Event.findById(eventId)
        if(!event) return response.status(404).json({error: "No Event is Found"})
        if(event.organizer.toString() !== user._id.toString()) return response.status(403).json({error:"Only Event Organizer can delete Event!"})
        
        //Check if Event is In this Club, even if Event exists, we only want to delete events that are in particular clubs
        const club = await Club.findById(clubId)
        if(!club || !club.events.includes(event._id)) return response.status(404).json({error: "Can't Find Event in this Club!"})
        
        await Event.findByIdAndDelete(eventId)
        //Delete Event from the Array of Events in Club
        await Club.findByIdAndUpdate(
            clubId,
            {$pull : {events: eventId}}) //Removes EventId from Events array in Club after deletion.
            response.status(204).end()
        }
    catch(error){
        response.status(500).json({error: "Something Went Wrong"})
    }
    }



module.exports = {
    createEvent,
    viewEvents,
    deleteEvent
}