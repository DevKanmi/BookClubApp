const {test , beforeEach, after, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const User = require('../models/signUpSchema')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('Testing User Signup..', async()=>{
beforeEach(async()=>{
    await User.deleteMany()

    const passwordHash = await bcrypt.hash('password',10)
    const user = new User({name: 'clinton', username: 'akclinton',email: 'ak@gmail.com,', passwordHash: passwordHash})
    await user.save()
})

test('Creation of new user is successful, DB is updated', async() =>{
    const userAtStart = await helper.usersInDb()
    const newUser = {
        name: 'Clinton',
        username:'Clintonak',
        email:'clinton@gmail.com',
        password:'oluwaclinton'
        }
    await api
        .post('/api/users/signup')
        .send(newUser)
        .expect(201)
        .expect('content-type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, userAtStart.length+1)

    const usernames = usersAtEnd.map(u =>u.username)
    assert(usernames.includes(newUser.username))

    assert.notStrictEqual(newUser.username, newUser.password) //Tests if Username is same as Password
})

test('Creation fails if Username is already taken ' , async() =>{
    const userAtStart = await helper.usersInDb()

    const newUser = {
        name : 'clinton',
        username: 'akclinton',
        email:'akclinton@gmail.com',
        password: 'password'
    }

    await api
        .post('/api/users/signup')
        .send(newUser)
        .expect(400)
        .expect('content-type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(userAtStart.length, usersAtEnd.length)
})



})



after(async() =>{
    await mongoose.connection.close()
})