interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <>
      {
        props.parts.map(part => {
          <p>
            {part.name} {part.exerciseCount}
          </p>
        })
      }
    </>
  )
};


export default Content;