const mongoose = require('mongoose')
const{ Schema, model } = mongoose

const replySchema = new Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

replySchema.set('toJSON', {
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Reply = model('Reply',replySchema)

module.exports = Reply