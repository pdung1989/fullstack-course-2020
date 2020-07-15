import React from 'react'
import Header from './subcomponents/Header'
import Course1 from './subcomponents/Course1'
import Course2 from './subcomponents/Course2'
import Total from './subcomponents/Total'

const Course = ({courses}) => {
    return (
      <div>
        <Header />
        <Course1 courses={courses[0]} />
        <Total courses={courses[0]} />
        <Course2 courses={courses[1]} />
        <Total courses={courses[1]} />
      </div>
    )
  }

  export default Course