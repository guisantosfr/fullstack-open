import { useState } from 'react'
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import RecommendedBooks from './components/RecommendedBooks'

const ALL_AUTHORS = gql`
  query{
    allAuthors{
      name,
      born
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title,
      author {
        name
      }
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ){
      name,
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const GET_USER = gql`{
  me {
    username
    favoriteGenre
  }
}`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(GET_USER)

  const client = useApolloClient()

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }


  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} result={authors.data.allAuthors} editAuthor={editAuthor} />
        <Books show={page === 'books'} result={books.data.allBooks} />
        <LoginForm show={page === 'login'} loginMutation={LOGIN} setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('new')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} result={authors.data.allAuthors} editAuthor={editAuthor} />
      <Books show={page === 'books'} result={books.data.allBooks} />
      <NewBook show={page === 'new'} addBook={addBook} />
      <RecommendedBooks show={page === 'recommend'} result={books.data.allBooks} user={user.data.me} />
    </div>
  )
}

export default App