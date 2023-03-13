import Person from "./Person"

const Persons = ({ contactsToShow, handleDelete }) => {
  return (
    <ul>
      {
        contactsToShow.map(person =>
          <div key={person.id}>
            <Person name={person.name} number={person.number} />
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        )
      }
    </ul>
  )

}

export default Persons