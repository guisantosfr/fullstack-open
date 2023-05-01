import { Link, Routes, Route } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
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

  return (
    <div>
      <div>
        <Link to='/authors'>
          <button>authors</button>
        </Link>
        <Link to='/books'>
          <button>books</button>
        </Link>
        <Link to='/new-book'>
          <button>add book</button>
        </Link>
      </div>

      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/authors' element={<Authors result={authors.data.allAuthors} editAuthor={editAuthor}/>} />
        <Route path='/books' element={<Books result={books.data.allBooks}/>} />
        <Route path='/new-book' element={<NewBook addBook={addBook} />} />
      </Routes>
    </div>
  )
}

export default App