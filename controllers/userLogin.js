const User = require('../models/signUpSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

//We want to Create out User login Function and Generate Token
//Generated Token is what will be used to access protected route

const userLogin = async(request,response) =>{
    try{
    const {identifier, password} = request.body //You can choose to login using email or username.

    const user = await User.findOne({
        $or: [{username:identifier},{email: identifier}] //This uses OR query to check if the identifier matches username or email in DB
    })
    if(!user){
    response.status(401).json({error: 'Username or password is Incorrect'})
    }
   const passwordIsCorrect = user === null? false : await bcrypt.compare(password, user.passwordHash)
   if(!passwordIsCorrect){
    response.status(401).json({error: 'Password is not correct'})
   }

   const tokenForUser = {
        username: user.username,
        email: user.email,
        id: user._id
   }

   const token = jwt.sign(tokenForUser, process.env.SECRET, {expiresIn: '1h'})
   
   response.status(201).json({
    message: 'Login Successful',
    token: token,
    user:{ id: user._id, username: user.username, email: user.email }
   })
}
    catch(error){
        response.status(400).json({error: "Login was not Successful"})
    }
}

module.exports = {userLogin}