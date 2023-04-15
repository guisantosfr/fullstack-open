import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector(state => state.anecdotes)

  const filteredAnecdotes =
    filter.length === 0
      ? anecdotes
      : anecdotes.filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(filter.toLowerCase())
      );

  const vote = (id) => {
    dispatch(voteOnAnecdote(id))
  }

  return (
    <div>
      {
        filteredAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdotesList