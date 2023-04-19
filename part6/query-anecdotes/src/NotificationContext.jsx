import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `you added "${action.payload}"`
    case 'VOTE':
      return `you voted "${action.payload}"`
    case 'ERROR':
      return `"${action.payload}"`
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationMessage = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  return notification
};

export const useNotificationDispatch = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '') //test null, undefined

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext