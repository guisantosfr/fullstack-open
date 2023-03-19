require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(errorHandler)

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            person
                ? res.json(person)
                : res.status(404).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    Person.find({ name: body.name })
        .then(person => {
            if (person.length) {
                res.status(403).send({ error: 'A person with that name already exists' })
            }
            else {
                const newPerson = new Person({
                    name: body.name,
                    number: body.number
                })

                newPerson.save().then(savedPerson => res.json(savedPerson))
                    .catch(error => next(error))
            }
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

/* app.get('/info', (req, res) => {
  res.send(`<div>
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  </div>`)
})
*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
