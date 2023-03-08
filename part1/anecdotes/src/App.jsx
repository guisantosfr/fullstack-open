import { useState } from 'react'

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0);

  function getRandomNumber() {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  function voteOnAnecdote() {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    getMostVoted()
  }

  function getMostVoted() {
    const max = Math.max(...votes);
    const index = votes.indexOf(max);
    setMostVoted(index);
  }

  return (
    <>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={voteOnAnecdote}>vote</button>
      <button onClick={getRandomNumber}>next anecdote</button>

      <Anecdote title="Anecdote with most votes" anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </>
  )
}

export default App