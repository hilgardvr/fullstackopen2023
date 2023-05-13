const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

mongoose.connect(config.MONGO_URL)
  .then(() => {
    console.log(`connected to mongo ${config.MONGO_URL}`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err)
  })

module.exports = app