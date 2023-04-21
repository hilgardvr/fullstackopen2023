const Header = ({props}) => {
  return (
      <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({props}) => {
    return (
      <div>
        {props.course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </div>
    )
}

const Total = ({props}) => {
    const total = props.course.parts.reduce((acc, v) => acc + v.exercises, 0)
    return (
      <p>
        <b>total of {total} exercises </b>
      </p>
    )
}

const Course = (course) => {
  return (
    <div>
      <Header props={course} />
      <Content props={course} />
      <Total props={course} />
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return <Course course={course} />
}

export default App
