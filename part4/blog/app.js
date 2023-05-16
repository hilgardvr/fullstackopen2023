const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./middleware/middleware')
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

mongoose.connect(config.MONGO_URL)
  .then(() => {
    console.log(`connected to mongo ${config.MONGO_URL}`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err)
  })

module.exports = app