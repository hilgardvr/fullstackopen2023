const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./middleware/middleware')
const morgan = require('morgan')
app.use(cors())
app.use(morgan(function (tokens, req, res) {
  const method = req.method
  const body = req.body ? JSON.stringify(req.body) : ""
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    body
  ].join(' ')
}))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

if (process.env.NODE_ENV == 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

mongoose.connect(config.MONGO_URL)
  .then(() => {
    console.log(`connected to mongo ${config.MONGO_URL}`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err)
  })

module.exports = app