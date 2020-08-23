const mongoose = require('mongoose')

var args = process.argv.slice(2);

const password = args[0]
const name = args[1]
const number = args[2]
const url =
  `mongodb+srv://fullstackopen:password@cluster0.ycvbr.mongodb.net/phone-book?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

/* const person = new Person({
  name: 'Ada Lovelace',
  number: '040-1231236'
})

person.save().then(result => {
    console.log('added '+ args[1]+ ' number '+ args[2]+ ' to phonebook')
}) */

Person.find({}).then(result => {
        console.log('phonebook:')
    result.forEach(p => {
        console.log(`${p.name} ${p.number}`)
        })
    mongoose.connection.close()
})