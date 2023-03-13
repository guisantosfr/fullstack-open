import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const addContact = (e) => {
    let alreadyExists = false
    e.preventDefault();

    for (let person of persons) {
      if (person.name === newName)
        alreadyExists = true
    }

    alreadyExists ?
      alert(`${newName} is already added to phonebook`) :
      personsService.create({ name: newName, number: newNumber, id: persons.length + 1 })
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        });
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