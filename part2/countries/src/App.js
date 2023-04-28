import { useEffect, useState } from 'react'
import countryService from './services/countries'

const Search = ({onChange}) => {
  return (<div>
    find countries <input onChange={onChange}/>
  </div>
  )
}

const Display = ({search, countries, shownCountries, setShownCountries}) => {
  const filtered = countries.filter(country => {
    return country.name.official.toLowerCase().includes(search.toLowerCase())
  })
  if (filtered.length > 10) {
    return (
    <div>
      Please refine your search - too many options
    </div>
    )
  } else {
    return (
      <>
        {filtered.map((element, i) => {
          const isShown = shownCountries.includes(element.name.official)
          // console.log(element.name.official, isShown)
          return (
          <div key={i}>
            <h4>{element.name.official}</h4>
            <button onClick={setShownCountries} value={element.name.official}>{isShown ? "hide" : "show"}</button>
            <div hidden={!isShown}>
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
              <img src={element.flags.svg} width='300' height='200' alt={element.flags.alt}></img>
            </div>
          </div>)
        })}
      </>
    )
  }
}

function App() {

  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }
  const handleShownCountyChange = (event) => {
    if (shownCountries.includes(event.target.value)) {
      setShownCountries(shownCountries.filter(c => c !== event.target.value))
    } else {
      setShownCountries(shownCountries.concat(event.target.value))
    }
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
      <Display 
        search={searchValue} 
        countries={countries} 
        shownCountries={shownCountries}
        setShownCountries={handleShownCountyChange}
      />
    </div>
  );
}

export default App;
