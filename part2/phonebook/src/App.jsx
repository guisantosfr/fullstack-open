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
  const [notification, setNotification] = useState("")
  const [errorNotification, setErrorNotification] = useState(false)

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
          .catch(() => {
            setNotification(
              `Information about ${newPerson.name} has already been added to the server.`
            );
            setErrorNotification(true);
            setNewName("");
            setNewPhone("");
          });
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
        })
        .catch(() => {
          setNotification(
            `Information about ${newPerson.name} has already been added to the server.`
          );
          setErrorNotification(true);
          setNewName("");
          setNewPhone("");
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
        .catch(() => {
          setNotification(
            `Information about ${newPerson.name} has already been added to the server.`
          );
          setErrorNotification(true);
          setNewName("");
          setNewPhone("");
        });
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
      {notification?.length > 0 ? (
        !errorNotification ? (
          <h3 className="notification">{notification}</h3>
        ) : (
          <h3 className="error">{notification}</h3>
        )
      ) : (
        <></>
      )}

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