import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],

  reducers: {
    updateAnecdote(state, action) {
      const votedAnecdote = action.payload

      const newState = state.map(anecdote =>
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
      )

      return newState.sort((a, b) =>
        a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteOnAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    await anecdotesService.addVote(votedAnecdote.id, votedAnecdote);
    dispatch(updateAnecdote(votedAnecdote));
  }
}

export default anecdoteSlice.reducer