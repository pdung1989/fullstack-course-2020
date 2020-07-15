import React from 'react'
import CourseName from './CourseName'
import Part from './Part'

const Course1 = ({courses}) => {
    return (
      <div>
        <CourseName courses={courses} />
        <Part part={courses.parts[0]} />
        <Part part={courses.parts[1]} />
        <Part part={courses.parts[2]} />
        <Part part={courses.parts[3]} />
      </div>
    )
  }

export default Course1