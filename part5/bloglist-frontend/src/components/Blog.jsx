import { useState } from 'react'
import PropTypes from 'prop-types'

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
    <div style={blogStyle} className='blog'>
      <div>
        <div style={showWhenVisible} className='subInfo'>
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
        <div style={hideWhenVisible} className='mainInfo'>
          {blog.title} by {blog.author}{' '}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleAddLike: PropTypes.func,
  handleRemoveBlog: PropTypes.func
}

export default Blog