const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./middlewares/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

//Import Routes Here
const signUpRouter = require('./routes/signUpRoute')
const loginRouter = require('./routes/loginRoute')
const bookRouter = require('./routes/booksRoute')




//CREATE MONGOOSE/DB CONNECTION HERE
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

async function DBconnecton () {
    try{
   await mongoose.connect(config.MONGODB_URI)
   // here
   logger.info('connected to MongoDB')
}
catch(error){
    logger.error('Error connecting to MongoDB :', error.message)
}
}

DBconnecton();

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use(middleware.requestLogger)


app.use('/api/users', signUpRouter)
app.use('/api/login',loginRouter)
app.use('/api/book',bookRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


//REMEMBER TO TWEAK TO PREFERENCE