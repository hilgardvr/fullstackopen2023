
const tokenExtractor = (req, re, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  next()
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
  next(error)
}

module.exports = {
    tokenExtractor,
    errorHandler
}