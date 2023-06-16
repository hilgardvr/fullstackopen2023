import { voteFor } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const anecdoteFilter = useSelector(state => state.filter)
    // console.log("filter:", anecdoteFilter)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteFor(id))
    }
    return (
        <div>
            {anecdotes.sort((a,b) => b.votes > a.votes)
            .filter(a => anecdoteFilter === "" || a.content.includes(anecdoteFilter) )
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