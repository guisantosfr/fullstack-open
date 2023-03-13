import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const addContact = (e) => {
    e.preventDefault();
    let oldPerson = persons.find(person => person.name === newName)
    let newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    let alreadyExists = false

    for (let person of persons) {
      if (person.name === newName)
        alreadyExists = true
    }

    if (alreadyExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(oldPerson.id, newPerson)
          .then(() => {
            let personsCopy = persons.filter(person => person.id !== oldPerson.id)
            let newPersonsCopy = [...personsCopy, newPerson]
            setPersons(newPersonsCopy)
            setNotification(`Updated ${newPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personsService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        });

    }
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService.deletePerson(personToDelete.id)
        .then(() => {
          let newPersons = persons.filter(person => person.id !== personToDelete.id)
          setPersons(newPersons)
        })

    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    if (e.target.value !== '')
      setShowAll(false);

    setSearch(e.target.value);
  }

  const contactsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} handleDelete={deletePerson} />

    </div>
  )
}

export default App