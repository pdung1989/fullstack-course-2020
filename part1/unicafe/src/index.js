import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticRow = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )

const StatisticTable = (props) => {

  const value = props.good - props.bad
  const total = props.good + props.neutral + props.bad
  
  const average = total > 0 ? value / total : 0
  const positive = total > 0 ? props.good * 100 / total : 0

  if(total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <thead></thead>
        <tbody>
          <StatisticRow text="good" value={props.good} />
          <StatisticRow text="neutral" value={props.neutral} />
          <StatisticRow text="bad" value={props.bad} />
          <StatisticRow text="all" value={total} />
          <StatisticRow text="average" value={average} />
          <StatisticRow text="positive" value={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <StatisticTable
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
);

