import { useEffect, useState } from 'react'
import countryService from './services/countries'

const Search = ({onChange}) => {
  return (<div>
    find countries <input onChange={onChange}/>
  </div>
  )
}

const Display = ({search, countries}) => {
  const filtered = countries.filter(country => {
    return country.name.official.toLowerCase().startsWith(search.toLowerCase())
  })
  if (filtered.length > 10) {
    return (
    <div>
      Please refine your search - too many options
    </div>
    )
  } else {
    // console.log('filtered', filtered)
    return (
      <>
        {filtered.map(element => {
          return (
          <div key={element.name.official}>
            <h2>{element.name.official}</h2>
            <p><b>Capital:</b> {element.capital ? element.capital[0] : "no capital info found"}</p>
            <p><b>Area:</b> {element.area}</p>
            <h4>Languages</h4>
            <ul>
            {Object.values(element.languages).map((lan, i) => {
              return (
                <li key={i}>{lan}</li>
              )
            })}
            </ul>
            <img src={element.flags.svg} width='300' height='200'></img>
          </div>)
        })}
      </>
    )
  }
}

function App() {

  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }
  useEffect(() => {
    countryService.getAll()
      .then(resp => {
        // console.log(resp)
        setCountries(resp)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Search onChange={handleSearchChange}/>
      <Display search={searchValue} countries={countries}  />
    </div>
  );
}

export default App;
