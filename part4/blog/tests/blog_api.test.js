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

test('identifier property of id', async () => {
    const resp = await api.get('/api/blogs')
    const first = resp.body[0]
    expect(first.id).toBeDefined()
})

test('add new blog with post', async () => {
    const b = {...initBlogs[0]}
    const newTitle = "New title 99" 
    b.title = newTitle
    const newBlog = new Blog(b)
    const addedBlog = await api
        .post('/api/blogs')
        .send(b)
    const all = (await api.get('/api/blogs')).body
    expect(all).toHaveLength(3)
    const found = all.find(b => b.id === addedBlog.body.id)
    expect(found.title).toBe(newTitle)
})

test('empty likes default to 0', async () => {
    const b = {...initBlogs[0]}
    delete b.likes
    const addedBlog = (await api
        .post('/api/blogs')
        .send(b))
        .body
    const found = await Blog.findById(addedBlog.id)
    expect(found.likes).toBe(0)
})

test('empty title or url 400', async () => {
    const emptyUrl = {...initBlogs[0]}
    delete emptyUrl.url
    await api
        .post('/api/blogs')
        .send(emptyUrl)
        .expect(400)
    const emptyTitle = {...initBlogs[0]}
    delete emptyTitle.title
    await api
        .post('/api/blogs')
        .send(emptyTitle)
        .expect(400)
})

test('delete existing', async () => {
    const all = (await api.get('/api/blogs')).body
    expect(all).toHaveLength(initBlogs.length)
    await api.delete(`/api/blogs/${all[0].id}`)
        .expect(204)
    const allAfterDelete = (await api.get('/api/blogs')).body
    expect(allAfterDelete).toHaveLength(initBlogs.length - 1)
})

test('delete invalid id', async () => {
    const all = (await api.get('/api/blogs')).body
    expect(all).toHaveLength(initBlogs.length)
    // await api.delete(`/api/blogs/645755b121f1e4d3ac8154cd`)
    await api.delete(`/api/blogs/invalid-id`)
        .expect(400)
    const allAfterDelete = (await api.get('/api/blogs')).body
    expect(allAfterDelete).toHaveLength(initBlogs.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})