import React, {useState} from 'react'

const Button = ({handleAnecdote}) => {
  return (
    <button onClick={handleAnecdote}>next anecdote</button>
  )
}

const ButtonVote = ({handleVote}) => {
  return (
    <button onClick={handleVote}>vote</button>
  )
}

const MostVotes = (props) => {  
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.maxAnecdote}</p>
      <p>has {props.maxVotes} votes</p>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))
  const [maxIndex, setMaxIndex] = useState(0)
    
  const handleAnecdote = () => {
    const min = Math.ceil(0)
    const max = Math.floor(anecdotes.length)
    const i = Math.floor(Math.random() * (max - min) + min)
    console.log('i', i)
    setSelected(i)
  }

  const handleMaxVote = () => {
    const maxIndex = Object.values(votes).indexOf(Math.max(...Object.values(votes)))
    setMaxIndex(maxIndex)
  }

  const handleVote = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
    handleMaxVote()
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <ButtonVote handleVote={handleVote} />
      <Button handleAnecdote={handleAnecdote} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>{votes[maxIndex]}</p>
    </div>
  )
}


export default App;
