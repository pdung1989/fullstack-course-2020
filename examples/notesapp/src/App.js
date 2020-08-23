import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div> 
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
    //GET DATA FROM THE SERVER 
    /* const hook = () => {
      console.log('effect')
      axios
        .get('http://localhost:3001/notes')
        .then(response => {
          console.log('promise fulfilled')
          //store the notes received from the server into the state
          setNotes(response.data) 
        })
    }

    useEffect(hook, []) */

    //Another way to write useEffect()
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNote => {
        setNotes(initialNote)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
        id: notes.length + 1,
    }
    
    //SEND DATA TO THE SERVER
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
    //UPDATE THE DATA
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}
    /* console.log('importance of ${id} needs to be toggled') */
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
  }

  const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
          <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
          </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 

          <Note 
            key={i} 
            note={note}
            toggleImpportance={() => toggleImportanceOf(note.id)} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
            value={newNote}
            onChange={handleNoteChange}
        />
          <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App 