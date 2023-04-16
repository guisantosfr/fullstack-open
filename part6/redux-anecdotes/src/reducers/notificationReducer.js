import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload

      return notification
    },
    removeNotification(state, action) {
      return ""
    },
  },
});

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(createNotification(notification))

    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer