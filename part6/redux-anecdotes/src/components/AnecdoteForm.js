import { useDispatch } from "react-redux"
import { addAncedote } from "../reducers/anecdoteReducer"


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(addAncedote(asObject(anecdote)))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
