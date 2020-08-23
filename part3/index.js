require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

var dateFormat = require('dateformat')
var morgan = require('morgan')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(p => {
        console.log(`${p.name} ${p.number}`)
    })
})

//Create 'body' token
morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebooks App<h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0

app.get('/info', (request, response) => {
    var now = new Date()
    var fullTime = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss Z '(Eastern European Standard Time)'")
    response.send
        (`<div>Phonebooks has info for ${maxId} people</div> <br>

      <div>${fullTime}</div>`)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(error => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    const randomId = Math.floor((Math.random() * 100) + 4)
    return randomId
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    /*     if (persons.map(person => person.name).indexOf(body.name) > -1) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        } */

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })

    person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedFormatedPerson => {
            response.json(savedFormatedPerson)
        })
        .catch(error => next(error))
    })

//ERROR HANDLER (middleware)
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
      }

    next(error)
}
// handler of requests with result to errors
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})