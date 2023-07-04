import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote } from './requests/request'

const App = () => {


  const handleVote = (anecdote) => {
    console.log('vote')
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

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutaion.mutate({id: getId(), content: content, votes: 0})
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
    
      <Notification />
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
