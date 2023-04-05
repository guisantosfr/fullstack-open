import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <div style={showWhenVisible}>
          {blog.title} by {blog.author}{' '}
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}
          <button>like</button>
          <br />
          {blog.user.name}
          <br />
          <button>remove</button>
        </div>
        <div style={hideWhenVisible}>
          {blog.title} by {blog.author}{' '}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
    </div>
  )
}

export default Blog