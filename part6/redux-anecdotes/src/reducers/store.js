import anecdoteReducer from './anecdoteReducer'
import filterRecuder from './filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
      anecdote: anecdoteReducer,
      filter: filterRecuder
    }
})

export default store