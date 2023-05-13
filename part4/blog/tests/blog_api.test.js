const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
    console.log('closing mongoose connection')
    const closed = await mongoose.connection.close()
    console.log(`closed connection`)
})