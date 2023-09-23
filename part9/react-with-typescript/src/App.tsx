interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {
        courseParts.map(part => (
          <Part key={part.name} coursePart={part} />
        ))
      }
    </>
  )
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic": {
      return (
        <>
          <p><b>{coursePart.name} {coursePart.exerciseCount}</b><br />
            <i>{coursePart.description}</i></p>
        </>
      );
    }
    case "group": {
      return (
        <>
          <p><b>{coursePart.name} {coursePart.exerciseCount}</b><br />
            project exercises {coursePart.groupProjectCount}</p>
        </>
      );
    }
    case "background": {
      return (
        <>
          <p><b>{coursePart.name} {coursePart.exerciseCount}</b><br />
            <i>{coursePart.description}</i><br />
            submit to {coursePart.backgroundMaterial}</p>
        </>
      );
    }
    case "special": {
      return (
        <>
          <p><b>{coursePart.name} {coursePart.exerciseCount}</b><br />
            <i>{coursePart.description}</i><br />
            required skills: {coursePart.requirements.map(r => <span key={r}>{" "}{r}</span>)}</p>
        </>
      );
    }
    default: {
      return assertNever(coursePart);
    }
  }
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;