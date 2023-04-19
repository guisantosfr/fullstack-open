import { useMutation, useQueryClient } from 'react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from "../NotificationContext"

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({
        type: "VOTE",
        payload: updatedAnecdote.content,
      })
      setTimeout(
        () => notificationDispatch({ type: "REMOVE" }),
        5000
      );
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote