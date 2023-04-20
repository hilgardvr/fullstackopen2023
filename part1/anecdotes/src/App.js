import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h3>{text}</h3>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
} 

const Votes = ({votes}) => {
  return (
    <div>has {votes} votes</div>
  )
}

const Anecdote = ({text}) => {
  return (
    <div>{text}</div>
  )
} 

const MostVoted = ({anecdotes, votes}) => {
  var highest = 0
  for(let i = 0; i < Object.keys(votes).length; i++) {
    if (votes[i] > votes[highest]) {
      highest = i
    }
  }
  return (
    <div>{anecdotes[highest]}</div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const randomSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length )
    setSelected(random)
  }
  const emptyVotes = {}
  for (let i = 0; i < anecdotes.length; i++) {
    emptyVotes[i] = 0
  }
  const [votes, setVotes] = useState(emptyVotes)
  const updateVotes = (index) => {
    const copy = { ...votes }
    copy[index] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} />
      <Votes votes={votes[selected]} />
      <Button handleClick={() => updateVotes(selected)} text="vote" />
      <Button handleClick={randomSelected} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App