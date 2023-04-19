import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({
        type: "CREATE",
        payload: newAnecdote.content,
      })
      setTimeout(
        () => notificationDispatch({ type: "REMOVE" }),
        5000
      )
    },

    onError: () => {
      notificationDispatch({
        type: "ERROR",
        payload: 'too short anecdote, must have length 5 or more'
      })
      setTimeout(
        () => notificationDispatch({ type: "REMOVE" }),
        5000
      );
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
