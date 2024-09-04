const mongoose = require('mongoose')
const{ Schema, model } = mongoose

const threadSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

threadSchema.set('toJSON', {
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Thread = model('Thread',threadSchema)

module.exports = Thread
