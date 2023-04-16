import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote, initalizeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector(state => state.anecdotes)

  useEffect(() => {
    dispatch(initalizeAnecdotes());
  }, [dispatch]);

  const filteredAnecdotes =
    filter.length === 0
      ? anecdotes
      : anecdotes.filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(filter.toLowerCase())
      );

  const vote = (id) => {
    let anecdote = anecdotes.filter((anecdote) => anecdote.id === id)
    let { content } = anecdote[0]

    dispatch(voteOnAnecdote(anecdote[0]))
    dispatch(setNotification(`Voted on "${content}".`, 5));
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