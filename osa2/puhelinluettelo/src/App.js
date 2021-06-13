import React, { useState, useEffect } from 'react'
import personService from './services/Persons'

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

const Persons = ({filteredPersons, removePerson}) => {
  return (
    <div>
      {filteredPersons.map(person => <Person key={person.id} person={person} removePerson={removePerson} />)}
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
    <p>{person.name} {person.number} <button onClick={() => { if (window.confirm(`Delete ${person.name}?`)) { {removePerson(person.id)}}}}>delete</button></p>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
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

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatePerson = persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase()))[0]
        const changedPerson = { ...updatePerson, number : newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setFilteredPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          })
      }
    }

    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
            setFilteredPersons(initialPersons)
          })      
      })
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
      // window.alert(`${newName} is already added to phonebook`)
      return true
    }
    return false
  }

  const handleNameSearch = (event) => {
    console.log(event.target.value)
    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
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
      <Persons filteredPersons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App
