const initialState = ""

const filterReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case "FILTER": 
      return action.payload
    default:
  }

  return state
}

export const filter = (str) => {
  return {
    type: "FILTER",
    payload: str
  }
}

export default filterReducer