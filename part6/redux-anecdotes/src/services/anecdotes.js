import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const addVote = async (anecdoteId) => {
  const anecdote = await axios.get(baseUrl + `/${anecdoteId}`)
  const voted = {
    ...anecdote.data,
    votes: anecdote.data.votes + 1
  }
  const response = await axios.put(baseUrl + `/${anecdoteId}`, voted)
  return response.data
}

const exports = { getAll, create, addVote }

export default exports
