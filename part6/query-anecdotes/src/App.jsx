import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes, { retry: 1, refetchOnWindowFocus: false })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(a => <Anecdote anecdote={a} key={a.id} />

      )}
    </div>
  )
}

export default App
