const app = require('./app') //The actual express Application
const config = require('./utils/config')
const logger = require('./utils/logger')

// The index.js file only imports the actual application from the app.js file and then starts the application.


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})  //Server runs by typing in CL "npm run dev"