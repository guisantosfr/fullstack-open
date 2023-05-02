import { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'

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
      author
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

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS} ]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  if(!token){
    return(
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} result={authors.data.allAuthors} editAuthor={editAuthor}/>
        <Books show={page === 'books'} result={books.data.allBooks}/>
        <LoginForm show={page === 'login'} login={login} setToken={(token) => setToken(token)}/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('new')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} result={authors.data.allAuthors} editAuthor={editAuthor}/>
      <Books show={page === 'books'} result={books.data.allBooks}/>
      <LoginForm show={page === 'login'}/>
      <NewBook show={page === 'new'} addBook={addBook} />
    </div>
  )
}

export default App