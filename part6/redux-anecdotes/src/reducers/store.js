import anecdoteReducer from './anecdoteReducer'
import filterRecuder from './filterReducer'
import notificationReducer from './notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
      anecdote: anecdoteReducer,
      filter: filterRecuder,
      notification: notificationReducer
    }
})

export default store