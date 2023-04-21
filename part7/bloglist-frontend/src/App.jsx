import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => { setBlogs(blogs) })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNotification('')
      setErrorMessage(false)
    }, 4000)
  }, [notification])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      const sortedBlogs = blogs.sort((blog1, blog2) => blog1.likes < blog2.likes ? 1 : blog1.likes > blog2.likes ? -1 : 0)
      setBlogs(sortedBlogs)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setNotification('Wrong username or password')
      setErrorMessage(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async (title, author, url) => {
    const newBlog = await blogService.create(title, author, url)

    setBlogs(blogs.concat(newBlog))

    setNotification(
      `A new blog ${newBlog.title} by ${newBlog.author} was added`
    )
  }

  const handleAddLike = async (blog) => {
    const newBlog = await blogService.addLike(blog.id, blog)

    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === newBlog.id) {
        const likes = newBlog.likes
        return { ...blog, likes }
      }
      return blog
    })

    updatedBlogs.sort((blog1, blog2) =>
      blog1.likes < blog2.likes ? 1 : blog1.likes > blog2.likes ? -1 : 0
    )

    setBlogs(updatedBlogs)
  }

  const handleRemoveBlog = async (id) => {
    await blogService.remove(id)
    let oldBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(oldBlogs)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        {
          notification?.length > 0 ? (
            !errorMessage ? (
              <h3 className="notification">{notification}</h3>
            ) : (
              <h3 className="error">{notification}</h3>
            )
          ) : (
            <></>
          )
        }

        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button
            id="login-button"
            type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {
        notification?.length > 0 ? (
          !errorMessage ? (
            <h3 className="notification">{notification}</h3>
          ) : (
            <h3 className="error">{notification}</h3>
          )
        ) : (
          <></>
        )
      }

      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel="new blog">
        <BlogForm
          handleCreateBlog={handleCreateBlog}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleAddLike={handleAddLike}
          handleRemoveBlog={handleRemoveBlog} />
      )}
    </div>
  )
}

export default App