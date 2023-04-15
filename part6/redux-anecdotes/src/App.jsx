import { useEffect } from "react"

import AnecdotesList from "./components/AnecdotesList"
import AnecdotesForm from "./components/AnecdotesForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

import anecdoteService from "./services/anecdotes"
import { setAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  )
}

export default App