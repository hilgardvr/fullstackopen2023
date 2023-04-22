import { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    <>
      {persons.map(person => 
        <div>{person.name}</div>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      id: 0,
      name: 'Arto Hellas',
    }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        id: persons.length,
        name: newName,
      }
      setPersons(persons.concat(person))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App