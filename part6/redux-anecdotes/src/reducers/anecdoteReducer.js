import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducerSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    addAncedote(state, action) {
      state.push(asObject(action.payload))
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