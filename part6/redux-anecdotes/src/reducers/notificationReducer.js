import { createSlice } from "@reduxjs/toolkit"

const initialState = "notification initial state"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(_, action) {
      return action.payload
    },
    removeNotification(_, _) {
      return null
    }
  }
})

export const setNotification = (note, timeout = 5000) => {
  return async dispatch => {
    dispatch(notify(note))
      setTimeout(() => {
          dispatch(removeNotification(null))
      }, timeout)
  }
}

const { notify, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
