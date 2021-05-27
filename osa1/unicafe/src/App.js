import React, { useState } from 'react'

const Button = (props) => {
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  const {text, value} = props
  if (text == 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value.toFixed(1)}%</td>
      </tr>
    )
  }
  if (text == 'average') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value.toFixed(1)}</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, allClicks} = props

  if (allClicks == 0) {
    return (
      <div>
        <p>No feedback give</p>  
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={allClicks} />
      <StatisticLine text='average' value={(1 * good + 0 * neutral + -1 * bad) / allClicks} />
      <StatisticLine text='positive' value={100 * good / allClicks} />
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )

}


export default App
