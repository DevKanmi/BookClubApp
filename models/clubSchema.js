const mongoose = require('mongoose')
const {Schema, model} = mongoose


const clubSchema = new Schema ({
    name : {
        type: String,
        minLength: 5,
        required: true
    },
    description : {
        type: String,
        required: true
    },

    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
     members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    joinRequests :[{
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending','approved','rejected'],
            default: 'pending',

        },
        createdAt :{
            type: Date,
            default: Date.now
        }

    }]



})




clubSchema.set('toJSON',{
    transform: (document , returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Club = model('Club', clubSchema)

module.exports = Club