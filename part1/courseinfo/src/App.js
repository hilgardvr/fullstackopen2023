function Header(props) {
  return (
      <h1>{props.course}</h1>
  )
}

function Content(props) {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
}

function Total(props) {
    return (
      <p
        >Number of exercises {props.numberOfExercises}
      </p>
    )
}

function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      {/* <h1>{course}</h1> */}
      <Header course={course} />
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} />
      <Total numberOfExercises={exercises1 + exercises2 + exercises3} />
      {/* <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p> */}
      {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
    </div>
  )
}

export default App;
