import { createSlice } from "@reduxjs/toolkit"

const initialState = "notification initial state"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    filter(state, action) {
      return action.payload
    }
  }
})

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer