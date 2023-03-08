import { useState } from 'react';

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    total != 0 ?
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={(good - bad) / total} />
          <StatisticLine text="positive" value={`${(good / total) * 100} %`} />
        </tbody>
      </table>
      : <p>No feedback given</p>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)

  function setGoodRating() {
    setGood(good + 1)
    setTotal(total + 1)
  }

  function setNeutralRating() {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  function setBadRating() {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>

      <Button handleClick={setGoodRating} text="good" />
      <Button handleClick={setNeutralRating} text="neutral" />
      <Button handleClick={setBadRating} text="bad" />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />

    </div>
  )
}

export default App