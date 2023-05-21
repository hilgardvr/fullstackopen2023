const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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
        "password": "password123"
    }, 
]

const passwordHash = async (pw) => {
  const saltRounds = 10
  return await bcrypt.hash(pw, saltRounds)
}

const getLoginToken = async (api) => {
    const user = await api.post('/api/users')
        .send(initUsers[0])
    const login = await api.post('/api/login')
        .send(initUsers[0])
    return login.body.token
}

const beforeEach = async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const users = initUsers.map(u => u.passwordHash = passwordHash(u.password)).map(u => new User(u))
    const promiseUsers = users.map(u => u.save())
    const savedUsers = await Promise.all(promiseUsers)
    const blogsWithUser = initBlogs.map(b => {
        return {
            ...b,
            userId: savedUsers[0]._id
        }
    })
    const blogs = blogsWithUser.map(b => new Blog(b))
    const promiseBlogs = blogs.map(b => b.save())
    const savedBlogs = await Promise.all(promiseBlogs)
    const user = savedUsers[0]
    user.blogs = savedBlogs.map(b => b._id)
    await user.save()
}

module.exports = {
    initBlogs, initUsers, beforeEach, getLoginToken
}