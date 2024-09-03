const mongoose = require('mongoose')

const {Schema, model} = mongoose

const bookSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },

    genre: String,

    summary: {
        type: String,
        default: ''
    },

    highlights: [{
        type: String
    }],
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

bookSchema.set('toJSON', {
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Book = model('Book', bookSchema)

module.exports = Book