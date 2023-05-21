const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId')
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const { title, url, likes } = request.body
  try {
    const user = request.user
    const blog = new Blog({title, url, likes, userId: user})
    const err = blog.validateSync()
    if (err) {
      return next(err)
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blogId = request.params.id.toString()
    const blog = await Blog.findById(blogId)
    const user = request.user
    if (blog.userId._id.toString() == user.id.toString()) {
        await blog.deleteOne()
        user.blogs = user.blogs.filter(blog => blog._id.toString() != blogId)
        await user.save()
    } 
    response.status(204).json(blog)
  } catch (ex) {
    next(ex)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id.toString()
  try {
    const blog = await Blog.findByIdAndUpdate(id, request.body, { new: true, runValidators: true, context: 'query' })
    return response.json(blog)
  } catch (ex) {
    next(ex)
  }
})

module.exports = blogRouter