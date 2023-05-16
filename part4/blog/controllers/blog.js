const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFromRequest = request => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, url, likes } = request.body
  const token = getTokenFromRequest(request)
  if (!token) {
    return response.status(401).json({ error: 'token invalid'})
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({title, url, likes, userId: user})
  const err = blog.validateSync()
  if (err) {
    return response.status(400).json({
      error: err.message
    })
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id.toString()
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (ex) {
    console.log(`Error deleting: `, ex)
    response.status(400).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id.toString()
  try {
    const blog = await Blog.findByIdAndUpdate(id, request.body, { new: true, runValidators: true, context: 'query' })
    return response.json(blog)
  } catch (ex) {
    console.log(ex)
    return response.status(500).end()
  }
})

module.exports = blogRouter