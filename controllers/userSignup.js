//Functions to be exported to the Routes
const User = require('../models/signUpSchema')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

//Creating a User
const createUser = async(request, response) =>{
    try{
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    
    const {name, username, email, password} = request.body
    
    //Checks if the username is equals to Password
    if(username === password){
        return response.status(400).json({error:"Username and Password can't be the same"})
    }

    //Check if the User email or Username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return response.status(400).json({ error: 'Username or email already exists' });
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)


    const user  = new User({
        name,
        username,
        email,
        passwordHash
    })

   const savedUser =  await user.save()
    response.status(201).json(savedUser)
}
    catch(error){
        response.status(402).json({error: 'user could not be Created'})
    }

}

const getUser = async(request, response) =>{
    const user = await User.find({})
    if(!user){
        response.status(400).json({error: 'No users are Found'})
    }
    else{
    response.status(200).json(user)
    }
}

module.exports ={
    createUser,
    getUser,
}

