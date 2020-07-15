import React from 'react'
import CourseName from './CourseName'
import Part from './Part'

const Course2 = ({courses}) => {
    return (
      <div>
        <CourseName courses={courses} />
        <Part part={courses.parts[0]} />
        <Part part={courses.parts[1]} />
      </div>
    )
  }

export default Course2