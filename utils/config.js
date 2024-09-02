//Create Configuration files
require('dotenv').config()

MONGODB_URI = process.env.MONGODB_URI  // connect your MongoDB using process.env.MONGODBURI

PORT = process.env.PORT //connect your Port 



module.exports  ={
    MONGODB_URI,
    PORT    
}  //Export your Mongodb Uri and Port