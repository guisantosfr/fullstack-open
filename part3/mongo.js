const mongoose = require('mongoose')

if (process.argv[2].length < 3) {
    console.log('give arguments as follows: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.p2faqmo.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

// No name and no number
if (!process.argv[3] && !process.argv[4]) {
    mongoose.connect(url)
        .then(() => {
            Person.find({}).then(result => {
                console.log('phonebook:')
                result.forEach(person => console.log(`${person.name} ${person.number}`))

                mongoose.connection.close()
            })
        }).catch(error => console.error(error))
} else {
    mongoose.connect(url)
        .then(() => {
            const name = process.argv[3]
            const number = process.argv[4]

            const person = new Person({
                name,
                number
            })

            return person.save()
        })
        .then(() => {
            console.log(`added ${process.argv[3]} number ${process.argv[4]} to the phonebook.`)
            mongoose.connection.close()
        })
        .catch(error => console.error(error))

}


