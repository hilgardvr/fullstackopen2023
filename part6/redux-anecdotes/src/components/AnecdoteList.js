import { voteFor } from "../reducers/anecdoteReducer"
import { notify, removeNotification } from "../reducers/notificationReducer"
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const anecdoteFilter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteFor(id))
        dispatch(notify(`Voted for ${id}`))
        setTimeout(() => {
            dispatch(removeNotification(null))
        }, 5000)
    }
    return (
        <div>
            {anecdotes
            .filter(a => anecdoteFilter === "" || a.content.includes(anecdoteFilter) )
            .sort((a,b) => b.votes > a.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>

    )
}

export default AnecdoteList