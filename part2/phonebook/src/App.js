import { useEffect, useState } from 'react'
import personService from './services/persons'

const Header = ({text}) => {
  return <h2>{text}</h2>
}

const Numbers = ({persons, search, handleDelete}) => {
  const filtered = persons.filter(
    p => p.name.toLowerCase().startsWith(search.toLowerCase())
  )
  return (
    <>
      <Header text={"Numbers"} />
      {filtered.map(person => 
        <div key={person.id}>
          {person.name} {person.number} 
          <button onClick={handleDelete} value={person.id}>delete</button>
        </div>)}
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
    // console.log('effect')
    personService.getAll()
      .then(resp => { 
        // console.log('received;')
        setPersons(resp)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (event) => {
    const id = event.target.value
    const person = persons.find(p => p.id.toString() === id.toString())
    const deletePerson = window.confirm(`Do you want to delete ${person.name}`)
    if (deletePerson) {
      personService
        .deleteNumber(id)
        .then(setPersons(persons.filter(p => p.id.toString() !== id.toString())))
        .catch(err => console.log(err))
    }
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      const replace = window.confirm(`Do you want to replace ${newName}`)
      if (replace) {
        const person = {
          name: newName,
          number: newNumber,
        }
        personService.update(existingPerson.id, person)
          .then(resp => {
            setPersons(persons.filter(p => p.id !== existingPerson.id).concat(resp))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      }
      personService.create(person)
        .then(resp => {
          setPersons(persons.concat(resp))
          setNewName('')
          setNewNumber('')
        })
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
      <Numbers persons={persons} search={searchValue} handleDelete={deletePerson} />
    </div>
  )
}

export default App