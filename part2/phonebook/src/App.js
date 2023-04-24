import { useEffect, useState } from 'react'
import axios from 'axios'

const Header = ({text}) => {
  return <h2>{text}</h2>
}

const Numbers = ({persons, search}) => {
  const filtered = persons.filter(
    p => p.name.toLowerCase().startsWith(search.toLowerCase())
  )
  return (
    <>
      <Header text={"Numbers"} />
      {filtered.map(person => 
        <div key={person.id}>{person.name} {person.number}</div>)}
    </>
  )
}

const Filter = ({onChange, search}) => {
  return (
    <div>
      <Header text={"Phonebook"} />
      filter shown with <input onChange={onChange} value={search} />
    </div>
  )
}

const Add = (props) => {
  return (
    <div>
      <Header text={"Add new"} />
      <form onSubmit={props.addPerson}>
        <div>
          name: <input onChange={props.handleNameChange} value={props.newName}/>
        </div>
        <div>
          number: <input onChange={props.handleNumberChange} value={props.newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(resp => {
        console.log('promise fulfilled', resp)
        setPersons(resp.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <Filter onChange={handleSearchChange} search={searchValue} />
      <Add 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        newName={newName} 
        handleNumberChange={handleNumberChange} 
        newNumber={newNumber} 
      />
      <Numbers persons={persons} search={searchValue} />
    </div>
  )
}

export default App