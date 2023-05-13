const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')

const initBlogs = [
    {
        "title": "Test Title",
        "author": "John Galt",
        "url": "www.johngalt.com",
        "likes": 10,
    },
    {
        "title": "Test Title1",
        "author": "John Galt",
        "url": "www.johngalt.com",
        "likes": 10,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = initBlogs.map(b => new Blog(b))
    const promiseBlogs = blogs.map(b => b.save())
    await Promise.all(promiseBlogs)
})


test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const resp = await api.get('/api/blogs')
    expect(resp.body).toHaveLength(2)
})

afterAll(async () => {
    await mongoose.connection.close()
})