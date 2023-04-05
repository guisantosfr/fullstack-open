import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (title, author, url) => {
  const newBlog = { title, author, url }
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = (id, blog) => {
  const request = axios.put(baseUrl + '/' + id, blog, {
    headers: { authorization: token },
  })
  return request.then((response) => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, addLike }