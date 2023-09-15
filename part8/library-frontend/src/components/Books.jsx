import { useState } from "react"

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState("all genres")

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = [...result]
  const genres = ["refactoring", "agile", "patterns", "design", "crime", "classic", "all genres"]

  return (
    <div>
      <h2>books</h2>
      {filter !== "all genres" ? <p>in genre {filter}</p> : (null)}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            books.filter(book => filter === "all genres" ? book : book.genres.includes(filter)).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      {genres.map(g =>
        <button key={g} onClick={() => setFilter(g)}>{g}</button>
      )}
    </div>
  )
}

export default Books