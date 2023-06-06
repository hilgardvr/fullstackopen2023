const testingRouter = require('express').Router()
const testing = require('../tests/test_helper')

testingRouter.post('/reset', async (request, response) => {
    await testing.clearDb()
    response.status(204).end()
})

module.exports = testingRouter
