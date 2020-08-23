 
import React from 'react'

const Note = ({ note, toggleImpportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImpportance}>{label}</button>
      </li>
  )
}

export default Note