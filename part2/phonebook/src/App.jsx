import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const addName = (e) => {
    let alreadyExists = false;

    e.preventDefault();

    for (let person of persons) {
      if (person.name === newName)
        alreadyExists = true;
    }

    alreadyExists ?
      alert(`${newName} is already added to phonebook`) :
      setPersons(persons.concat({ name: newName }))


    setNewName('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => <li key={person.name}>{person.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App