import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { addAncedote } from './reducers/anecdoteReducer'
import store from './reducers/store'
import getAll from './services/anecdotes'

getAll().then(anecdotes => {
  anecdotes.forEach(a => store.dispatch(addAncedote(a)))
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
