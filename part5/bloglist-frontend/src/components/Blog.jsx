import { useState } from "react"

const Blog = ({ blog, handleAddLike, handleRemoveBlog }) => {
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

  const addLike = () => {
    blog.likes += 1
    handleAddLike(blog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemoveBlog(blog.id)
    }
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
          <button onClick={addLike}>like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={removeBlog}>remove</button>
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