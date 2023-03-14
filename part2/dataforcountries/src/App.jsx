import { useState, useEffect } from 'react'
import axios from 'axios'

import Results from './components/Results'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [searchOn, setSearchOn] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  })

  const countriesToShow = searchOn
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : countries

  const handleChange = (e) => {
    setSearch(e.target.value)

    e.target.value.length > 0
      ? setSearchOn(true)
      : setSearchOn(false)
  }

  return (
    <>
      <p>Find countries</p>
      <input value={search} onChange={handleChange} />
      <Results results={countriesToShow} />
    </>
  )
}

export default App