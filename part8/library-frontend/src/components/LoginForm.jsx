import { useState } from "react"

const LoginForm = ({show}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show) {
    return null
  }

  const login = () => {}

  return(
    <form onSubmit={login}>
      <div>
        name
        <input
          value={username}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm