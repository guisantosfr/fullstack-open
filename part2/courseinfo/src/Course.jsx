const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </ul>
  )
}

const Total = ({ total }) => {
  const exercises = total.map(part => part.exercises);

  return (
    <p>total of {exercises.reduce((acc, current) => acc + current, 0)} exercises</p>
  )
}

const Part = (props) => {
  return (
    <li>
      {props.name} {props.exercises}
    </li>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

export default Course;