import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')
    const [filterPersons, setFilterPersons] = useState(persons)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const deleteModeOf = (person) => {
        if(window.confirm('Delete ' + person.name)) {
            personService
                .deletePerson(person.id)
                // .then(() => {
                //     personService
                //         .getAll()
                //         .then(initialPersons => {
                //             setPersons(initialPersons)
                //         })
                // })
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        } 
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if(persons.map(person => person.name).indexOf(personObject.name) > -1) {
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one`)) {
                const foundPersons = persons.filter(p => p.name === personObject.name)
                personService
                    .update(foundPersons[0].id, personObject)
                    .then((returnedPerson) => {
                        setPersons(persons.filter(p => p.name !== personObject.name).concat(returnedPerson))
                    })
                    .then(success => {
                        console.log ('number added')
                        setSuccessMessage(
                            `Added new number ${newNumber} to ${newName}`
                        )
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        console.log('ERROR')
                        setErrorMessage(
                            `Information of '${newName}' has been removed from the server.`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
        } else {
            personService
                .create(personObject)
                .then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson))
                })
                .then(success => {
                    setSuccessMessage(
                        `Added ${newName}`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    console.log(error.response.data.error)
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        }
    } 
    
    const handleAddName = (event) => {
      setNewName(event.target.value)
    }

    const handleAddNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setFilterText(event.target.value)
    }

    // Update filterPersons again when filterText or persons are changed
    useEffect(() => {
        const filterList = filterText.length > 0 ? persons.filter((p) => {
            return p.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
        }) : persons
        setFilterPersons(filterList)

    }, [persons, filterText])
    
    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={successMessage} classCss='success' />
            <Notification message={errorMessage} classCss='error' />
            <Filter filterText={filterText} handleFilter={handleFilter} />
            <h3>Add a new</h3>
            <PersonForm addPerson={addPerson} 
                newName={newName}
                handleAddName={handleAddName} 
                newNumber={newNumber}
                handleAddNumber={handleAddNumber}
            />
            <h1>Numbers</h1>
            <Persons 
                filterPersons={filterPersons} 
                deleteMode={deleteModeOf}
            />
        </div>
    )
}

export default App