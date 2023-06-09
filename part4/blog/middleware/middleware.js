const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    req.user = await User.findById(decodedToken.id)
    next()
  } catch (err) {
    console.error("error", err)
    next(err)
  }
}

const errorHandler = (error, req, res, next) => {
  if (error && error.name == "CastError") {
    return res.status(400).send({error: 'malformed id'})
  }
  if (error && error.name == "ValidationError") {
    return res.status(400).send({error: error.message})
  }
  if (error && error.name == "JsonWebTokenError") {
    return res.status(401).send({error: error.message})
  }
  if (error) {
    return res.status(500).send({error: error.message})
  }
  next(error)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    errorHandler
}