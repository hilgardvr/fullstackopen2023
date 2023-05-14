const Blog = require('../models/blog')
const User = require('../models/user')

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
        "likes": 0,
    }
]

const initUsers = [
    {
        "username": "John",
        "name": "John",
        "passwordHash": "hash123"
    }
]

const beforeEach = async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const blogs = initBlogs.map(b => new Blog(b))
    const promiseBlogs = blogs.map(b => b.save())
    const users = initUsers.map(u => new User(u))
    const promiseUsers = users.map(u => u.save())
    await Promise.all(promiseBlogs)
    await Promise.all(promiseUsers)
}

module.exports = {
    initBlogs, initUsers, beforeEach
}