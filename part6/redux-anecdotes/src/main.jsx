import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const anecdotesStore = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={anecdotesStore}>
    <App />
  </Provider>,
)
