import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Find = ({handleCountrySearch}) => {
  return (
    <div>
      find countries <input onChange={handleCountrySearch} />
    </div>
  )
}

const Countries = (props) => {
  const {filteredCountries, setFilteredCountries, weather} = props
  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]    
    return (
      <Country country={country} weather={weather} />
    )
  } else {
    return (
      <div>
        {filteredCountries.map(country => <CountryForm key={country.name} country={country} setFilteredCountries={setFilteredCountries} />)}
      </div>
    )
  }
}

const CountryForm = (props) => {
  const {country, setFilteredCountries} = props
  return (
    <div>
      <p>{country.name} <button onClick={() => setFilteredCountries([country])}>show</button></p>
    </div>
  )
}

const Country = ({country, weather}) => {  
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img alt={country.name} src={country.flag} width="100" height="100"/>
      <h3>Weather in {country.capital}</h3>
      <p><b>temperature:</b> {weather.temperature} Celsius</p>
      <img alt={country.name} src={weather.weather_icons} width="100" height="100"/>
      <p><b>wind:</b> {weather.wind_speed} ms {weather.wind_dir}</p>
    </div>
  )
}

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [weather, setWeather] = useState('')
  const [capitals, setCapitals] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current' ,{ params: { access_key: api_key, units:'m', query: capitals}})
      .then(response => {
        setWeather(response.data)
      })
  }, [capitals])

  const handleCountrySearch = (event) => {
    const filterCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log('filter', filterCountries)
    setFilteredCountries(filterCountries)

    const capitals = filterCountries.map(country => country.capital)
    setCapitals(capitals[0])

  }

  // const getWeather = (capital) => {
  //   console.log('weather', weather)
  // }

  return (
    <div>      
      <Find handleCountrySearch={handleCountrySearch} />
      <Countries filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} weather={weather} />
    </div>
  )
}

export default App
