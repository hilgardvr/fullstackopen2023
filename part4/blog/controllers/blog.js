const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const err = blog.validateSync()
  if (err) {
    return response.status(400).json({
      error: err.message
    })
  }
  const savedBlog = await blog.save()
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