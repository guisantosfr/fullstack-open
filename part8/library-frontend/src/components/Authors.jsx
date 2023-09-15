import { useState } from "react"

const Authors = ({ show, result, editAuthor }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = [...result]

  const submit = async (event) => {
    event.preventDefault()

    await editAuthor({ variables: { name, "setBornTo": parseInt(born) } })

    setName('')
    setBorn('')
  }

  if (!result) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option disabled hidden value="">Select author</option>
            {
              result.map(a => <option key={a.name} value={a.name}>{a.name}</option>)
            }
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors