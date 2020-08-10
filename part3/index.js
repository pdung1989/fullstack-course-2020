const express = require('express')
const app = express()

var dateFormat = require('dateformat')
var morgan = require('morgan')

app.use(express.json())

app.use(express.static('build'))

app.use(morgan('tiny'))

//Create 'body' token
morgan.token('body', function getBody (req) {
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
    response.json(persons)
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

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    } 
}) 

app.delete('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(202).end()
})

const generateId = () => {
    const randomId = Math.floor((Math.random() * 100) + 4)
    return randomId
}

app.post('/api/persons', (request,response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    
    if (persons.map(person => person.name).indexOf(body.name) > -1) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    
    response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})