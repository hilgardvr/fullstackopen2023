const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')


beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret123', 10)
    const user = new User({username: 'root', passwordHash: passwordHash})
    await user.save()
})


test('creation succeeds with new username', async () => {
    const usersBefore = await User.find({})
    const newUser = {
        username: 'John',
        name: 'John',
        password: 'Galt'
    }
    await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const usersAfter = await User.find({})
    expect(usersAfter).toHaveLength(2)
    const userNames = usersAfter.map(u => u.username)
    expect(userNames).toContain(newUser.username)
})

test('invalid password fails with 400', async () => {
    const usersBefore = await User.find({})
    const newUser = {
        username: 'John',
        name: 'John',
        password: 'Ga'
    }
    const rest = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    expect(JSON.parse(rest.error.text).error).toBe("password must be atleast 3 characters long")
    const usersAfter = await User.find({})
    expect(usersAfter).toHaveLength(1)
})

test('invalid username fails with 400', async () => {
    const usersBefore = await User.find({})
    const newUser = {
        username: 'Jo',
        name: 'John',
        password: 'Galt'
    }
    const rest = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    expect(JSON.parse(rest.error.text).error).toContain('username must be at least 3 characters')
    const usersAfter = await User.find({})
    expect(usersAfter).toHaveLength(1)
})

afterAll(async () => {
    await mongoose.connection.close()
})