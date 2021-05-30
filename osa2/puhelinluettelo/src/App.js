import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleNameSearch}) => {
  return (
    <div>
      filter shown with <input onChange={handleNameSearch} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({filteredPersons}) => {
  return (
    <div>
      {filteredPersons.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })      
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (!nameIncluded()) {
      const personObject = {
        name: newName, 
        number: newNumber,
        id: persons.length + 1 
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const nameIncluded = () => {
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return true
    }
    return false
  }

  const handleNameSearch = (event) => {
    console.log(event.target.value)
    const filterPersons = persons.filter(person => person.name.includes(event.target.value))
    console.log('filtered', filterPersons)
    setFilteredPersons(filterPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNameSearch={handleNameSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
