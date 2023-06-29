import { createSlice } from "@reduxjs/toolkit"

const reducerSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAncedote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      // console.log("state",  JSON.parse(JSON.stringify(state)))
      // console.log("ac", action.payload)
      const id = action.payload
      const anecdoteVoted = state.find(a => a.id === id)
      // console.log("av", anecdoteVoted)
      const voted = {
        ...anecdoteVoted,
        votes: anecdoteVoted.votes + 1
      }
      return state.map(a => a.id === voted.id ? voted : a)
    }
  }
})

export const { addAncedote, voteFor } = reducerSlice.actions
export default reducerSlice.reducer
