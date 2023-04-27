import { Link, Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {

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
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/new-book' element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App