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

export const { notify, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer