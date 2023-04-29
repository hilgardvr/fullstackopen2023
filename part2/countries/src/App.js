import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Search = ({onChange}) => {
  return (<div>
    find countries <input onChange={onChange}/>
  </div>
  )
}

const DisplayCountry = ({element, isShown, i, setShownCountries, weather}) => {
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
        {weather ? (
          <div>
            <p><b>Weather</b></p>
            <p><b>Current temp: </b>{weather.current.temp_c}</p>            
            <img src={weather.current.condition.icon} alt="todo"/>
          </div>
          ) : null }
      </div>
      </div>
  )
}


const Display = ({countries, shownCountries, setShownCountries, weather}) => {

  if (!countries) {
    return (
    <div>
      No country data 
    </div>
    )
  }
  if (countries.length > 10) {
    return (
    <div>
      Please refine your search - too many options
    </div>
    )
  } else {
    return (
      <>
        {countries.map((element, i) => {
          const isShown = shownCountries.includes(element.name.official)
          return (
            <DisplayCountry 
              key={i}
              element={element} 
              isShown={isShown} 
              i={i} 
              setShownCountries={setShownCountries} 
              weather={weather}
            />)
        })}
      </>
    )
  }
}

function App() {

  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  const [coords, setCoords] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getAll()
      .then(resp => {
        setCountries(resp)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (coords) {
      weatherService.getWeather(coords.lat, coords.lon)
        .then(resp => setWeather(resp))
        .catch(err => console.log(err))
    }
  }, [coords])

  const handleLocationChange = (lat, lon) => {
    const currentCoords = {lat: lat, lon: lon}
    if (!coords || currentCoords.lat !== coords.lat || currentCoords.lon !== coords.lon) {
      setCoords(currentCoords)
    }
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleShownCountyChange = (event) => {
    event.preventDefault()
    if (shownCountries.includes(event.target.value)) {
      setShownCountries(shownCountries.filter(c => c !== event.target.value))
    } else {
      setShownCountries(shownCountries.concat(event.target.value))
    }
  }

  const filterCountries = () => {
    const filtered = countries.filter(country => {
      return country.name.official.toLowerCase().includes(searchValue.toLowerCase())
    })
    if (filtered.length === 1) {
      handleLocationChange(filtered[0].latlng[0], filtered[0].latlng[1])
    } else {
      handleLocationChange(null, null)
    }
    return filtered
  }

  return (
    <div>
      <Search onChange={handleSearchChange}/>
      <Display 
        countries={filterCountries()}
        shownCountries={shownCountries}
        setShownCountries={handleShownCountyChange}
        weather={weather}
      />
    </div>
  );
}

export default App;
