const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(helper.beforeEach)

describe('blog tests',  () => {
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
        const b = {...helper.initBlogs[0]}
        const newTitle = "New title 99" 
        b.title = newTitle
        const token = await helper.getLoginToken(api)
        const addedBlog = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(b)
        const all = (await api.get('/api/blogs')).body
        expect(all).toHaveLength(3)
        const found = all.find(b => b.id === addedBlog.body.id)
        expect(found.title).toBe(newTitle)
        expect(found.userId).toBeDefined()
    })


    test('empty likes default to 0', async () => {
        const b = {...helper.initBlogs[0]}
        delete b.likes
        const token = await helper.getLoginToken(api)
        const addedBlog = (await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(b))
            .body
        const found = await Blog.findById(addedBlog.id)
        expect(found.likes).toBe(0)
    })

    test('empty title or url 400', async () => {
        const emptyUrl = {...helper.initBlogs[0]}
        delete emptyUrl.url
        const token = await helper.getLoginToken(api)
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(emptyUrl)
            .expect(400)
        const emptyTitle = {...helper.initBlogs[0]}
        delete emptyTitle.title
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(emptyTitle)
            .expect(400)
    })

    test('not authorized 401', async () => {
        const blog = {...helper.initBlogs[0]}
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer <invalid>')
            .send(blog)
            .expect(401)
    })

    test('delete existing', async () => {
        const all = (await api.get('/api/blogs')).body
        expect(all).toHaveLength(helper.initBlogs.length)
        await api.delete(`/api/blogs/${all[0].id}`)
            .expect(204)
        const allAfterDelete = (await api.get('/api/blogs')).body
        expect(allAfterDelete).toHaveLength(helper.initBlogs.length - 1)
    })

    test('delete invalid id', async () => {
        const all = (await api.get('/api/blogs')).body
        expect(all).toHaveLength(helper.initBlogs.length)
        await api.delete(`/api/blogs/invalid-id`)
            .expect(400)
        const allAfterDelete = (await api.get('/api/blogs')).body
        expect(allAfterDelete).toHaveLength(helper.initBlogs.length)
    })

    test('update valid', async () => {
        const all = (await api.get('/api/blogs')).body
        const toUpdate = all[0]
        const likes = {
            likes: toUpdate.likes + 1
        }
        await api.put(`/api/blogs/${toUpdate.id}`)
            .send(likes)
            .expect(200)
        const afterUpdate = (await api.get('/api/blogs'))
            .body
            .find(b => b.id === toUpdate.id)
        expect(afterUpdate.likes).toBe(toUpdate.likes + 1)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})