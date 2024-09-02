const logger = require('./logger')

const requestLogger = (request, response, next) => {
   logger.info('request.method', request.method)
   logger.info('request.path: ', request.path)
   logger.info('request.body', request.body)

  next()
}



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
    //TWEAK TO PREFERENCE
  }



  const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
            //WRITE CODE HERE AND TWEAK
    next(error)
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}  