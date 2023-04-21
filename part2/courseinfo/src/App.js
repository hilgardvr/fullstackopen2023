const Header = ({name}) => {
  return (
      <h1>{name}</h1>
  )
}

const CourseHeader = ({name}) => {
  return (
      <h3>{name}</h3>
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
        {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </div>
    )
}

const Total = ({props}) => {
    const total = props.parts.reduce((acc, v) => acc + v.exercises, 0)
    return (
      <p>
        <b>total of {total} exercises </b>
      </p>
    )
}

const Course = ({courses}) => {
  return (
      <div>
        {courses.map(element => {
          return <div key={element.id}>
            <CourseHeader name={element.name} />
            <Content props={element} />
            <Total props={element} />
          </div>
        })}
      </div>
  )
}


const App = () => {
  const courses = [
    {
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
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        },
      ]
    },
  ]

  return (
    <div>
      <Header name={"Web development curriculum"}/>
      <Course courses={courses} />
    </div>
  )
}

export default App
