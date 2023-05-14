const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, url, likes, userId } = request.body
  const users = await User.find({})
  const randomUser = users[0]
  const blog = new Blog({title, url, likes, userId: randomUser})
  const err = blog.validateSync()
  if (err) {
    return response.status(400).json({
      error: err.message
    })
  }
  const savedBlog = await blog.save()
  randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
  await randomUser.save()
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