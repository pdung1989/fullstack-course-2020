import React from 'react'
import Person from './Person'

const Persons = ({filterPersons, deleteMode}) => {
    return (
    <div>
    {filterPersons.map((person,i) => <Person key={i} person={person} deleteMode={deleteMode} />)}
    </div> 
    )
}

export default Persons