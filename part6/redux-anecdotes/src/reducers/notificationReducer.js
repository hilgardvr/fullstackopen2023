import { createSlice } from "@reduxjs/toolkit"

const initialState = "notification initial state"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
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
