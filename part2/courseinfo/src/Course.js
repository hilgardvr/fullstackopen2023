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

export default Course