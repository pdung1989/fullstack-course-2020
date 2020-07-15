import React from 'react'

const Total = ({ courses}) => {
    const arrExercises = courses.parts.map(item => item.exercises)
    const sum = arrExercises.reduce((s,p) => {
      return s + p
    })
    return(
      <p><strong>total of {sum} exercises</strong></p>
    ) 
  }
  
  export default Total