const mongoose = require('mongoose')
const {Schema,model} =mongoose
//This Model is defined to store User interactions with the books in our books model.
const userBookSchema = new Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    book : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required: true
    }
})