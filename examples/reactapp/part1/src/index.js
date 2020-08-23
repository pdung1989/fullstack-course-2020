import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/* const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age
  
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}
 */

//COMPONENT STATE, EVENT HANDLER

/* const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
  )

const App = () => {
  const [counter, setCounter] = useState(0)
  
  const increaseByOne = () => setCounter(counter + 1)

  const decreaseByOne = () => setCounter(counter - 1)

  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button 
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
    </div>
  )
} */

//MORE COMPLEX STATE
/* const App = (props) => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => 
    setClicks({...clicks, left: clicks.left + 1})

  const handleRightClick = () => 
    setClicks({...clicks, right: clicks.right + 2})
  
  return (
    <div>
      <div>
        {clicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {clicks.right}
      </div>
    </div>
  )
} */


//HANDLE ARRAYS

/* const App =(props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick= () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
} */

//CONDITIONAL RENDERING
const History = (props) => {
  console.log('props value is ', props)
  if(props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join('')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
) 

const App =(props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick= () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left'/>
        <Button onClick={handleRightClick} text='right'/>
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
