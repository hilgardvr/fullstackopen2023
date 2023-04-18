import { useState } from 'react'


const DisplaySection = ({text}) => (
  <h2>{text}</h2>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const DisplayStats = ({text, stat}) => (
  <div>{text} {stat}</div>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log("good", good)
  console.log("bad", bad)
  console.log("neutral", neutral)

  return (
    <div>
      <DisplaySection text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <DisplaySection text="statistics" />
      <DisplayStats text="good" stat={good} />
      <DisplayStats text="neutral" stat={neutral} />
      <DisplayStats text="bad" stat={bad} />
    </div>
  )
}

export default App