import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, removeNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdotesForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(content)

    dispatch(createAnecdote(content))
    dispatch(createNotification(`Anecdote "${content}" was created.`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default AnecdotesForm