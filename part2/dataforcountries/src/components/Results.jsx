const Results = ({ results }) => {

  if (results.length > 10) {
    return (
      <p>Too many countries, specify another filter</p>
    )
  }

  else if (results.length > 1) {
    return (
      <ul>
        {
          results.map(country => <li key={country.name.common}>{country.name.common}</li>)
        }
      </ul>
    )
  }

  else if (results.length === 1) {
    console.log(results)
    const country = results[0]

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>

        <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>

        <img src={country.flags.svg} alt={country.flags.alt} loading="lazy" width="480px" />

      </div>
    )

  }
}

export default Results