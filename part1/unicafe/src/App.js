import { useState } from 'react'


const DisplaySection = ({text}) => (
  <h2>{text}</h2>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <div>{text} {value}</div>
)

const Statistics = ({stats}) => {
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
    return (
      <div>
        <StatisticLine text="good" value={stats.good} />
        <StatisticLine text="neutral" value={stats.neutral} />
        <StatisticLine text="bad" value={stats.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={ave} />
        <StatisticLine text="positive" value={positivePercent + " %"} />
      </div>
    )
  } else {
    return (
      <div>
        <StatisticLine text="No feedback given" />
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
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
      <Statistics stats={stats} />
    </div>
  )
}

export default App