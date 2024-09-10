const mongoose = require('mongoose')
const {Schema, model} = mongoose

const eventSchema  = new Schema({
    title :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    organizer :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club"
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club"
    },
    duration: {
        type: Number
    },
    created: {
        createdAt: Date.now()
    }
})

eventSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Event  = model("Event", eventSchema)

module.exports = Event