import { useState } from 'react'


const DisplaySection = ({text}) => (
  <h2>{text}</h2>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const DisplayStat = ({text, stat}) => (
  <div>{text} {stat}</div>
)

const DisplayStats = ({stats}) => {
  // console.log(stats)
  const keys = Object.keys(stats)
  let total = 0
  keys.forEach(key => {
    total += stats[key]
  })
  let ave = 0
  let positivePercent = 0
  if (total > 0) {
    ave = (stats["good"] - stats["bad"]) / total
    positivePercent = stats["good"] * 100 / total
  }
  return (
    <div>
      <DisplayStat text="good" stat={stats.good} />
      <DisplayStat text="neutral" stat={stats.neutral} />
      <DisplayStat text="bad" stat={stats.bad} />
      <DisplayStat text="all" stat={total} />
      <DisplayStat text="average" stat={ave} />
      <DisplayStat text="positive" stat={positivePercent + " %"} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // console.log("good", good)
  // console.log("bad", bad)
  // console.log("neutral", neutral)
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
  }

  return (
    <div>
      <DisplaySection text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <DisplaySection text="statistics" />
      <DisplayStats stats={stats} />
    </div>
  )
}

export default App