import React from 'react'

const Person = ({person, deleteMode}) => {

    const handleDelete = (event) => {
        event.preventDefault()
        deleteMode(person) 
    }

    return (
        <div>
            {person.name} {person.number}
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default Person