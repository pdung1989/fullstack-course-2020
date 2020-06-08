import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)) //set an array of votes [0, 0, 0, 0, 0, 0] of each anecdote, starting equal to 0
  const [maxVote, setMaxVote] = useState(0)


  //function to get a random integer number between 0 - max number 
  const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //Vote for displayed anecdote 
  const increaseVote = (anecdoteIndex) => {
    const votesCopy = [...votes];
    votesCopy[anecdoteIndex] += 1;

    setVotes(votesCopy);
    setMaxVote(getMostVote());
  }

  //Get most votes
  const getMostVote = () => {
    const mostVote = votes.reduce(function(a, b) {
      return Math.max(a, b);
    });
    return votes.indexOf(mostVote);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={() => increaseVote(selected)} text='vote' />
      <Button handleClick={() => setSelected(randomInt(anecdotes.length))} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVote]}
      <br />
      has {votes[maxVote]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)