import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, patchAnecdote } from './requests/request'
import { useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "EMPTY": 
      return null
    default:
      return null
  }
}

const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const handleVote = (anecdote) => {
    patchAnecdoteMutaion.mutate(
      {
        ...anecdote,
        votes: anecdote.votes + 1
      }
    )
    notificationDispatch({
      type: "SET",
      payload: `Voted for: ${anecdote.content}`
    })
    setTimeout(() => notificationDispatch("EMPTY"), 5000)
  }

  const queryClient = useQueryClient()

  const result = useQuery('anecdotes', getAnecdotes, { retry: false })

  const newAnecdoteMutaion = useMutation(
    createAnecdote, 
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    }
  )

  const patchAnecdoteMutaion = useMutation(
    patchAnecdote, 
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    }
  )

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutaion.mutate({id: getId(), content: content, votes: 0})
    notificationDispatch({
      type: "SET",
      payload: `Created: ${content}`
    })
    setTimeout(() => notificationDispatch("EMPTY"), 5000)
  }

  if (result.isLoading) {
    return <div>Loading data..</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to a problem on the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification} />
      <AnecdoteForm onCreate={onCreate} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
