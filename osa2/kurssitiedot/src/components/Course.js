import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = ({parts}) => {

  let initialValue = 0
  let total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue)

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <b>total of {total} exercises</b>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course