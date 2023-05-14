const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({username, name, passwordHash})
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})


module.exports = userRouter