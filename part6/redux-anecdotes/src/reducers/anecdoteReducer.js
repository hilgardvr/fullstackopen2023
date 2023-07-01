import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const reducerSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAncedote(state, action) {
      state.push(action.payload)
    },
    addAncedotes(state, action) {
      state.push(...action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const anecdoteVoted = state.find(a => a.id === id)
      const voted = {
        ...anecdoteVoted,
        votes: anecdoteVoted.votes + 1
      }
      return state.map(a => a.id === voted.id ? voted : a)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(addAncedotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch(addAncedote(newAnecdote))
  }
}

export const addVote = anecdoteId => {
  return async dispatch => {
    const voted = await anecdoteService.addVote(anecdoteId)
    dispatch(voteFor(voted.id))
  }
}

export const { addAncedote, addAncedotes, voteFor } = reducerSlice.actions
export default reducerSlice.reducer
