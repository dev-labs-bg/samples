
// ------------------------------------
// Constants
// ------------------------------------
export const SET_USER = 'SET_USER'

// ------------------------------------
// Actions
// ------------------------------------
export const setUser = user => {
  return { type: SET_USER, user }
}

export const fetchUserData = () => {
  return (dispatch, getState) => {
    return Promise.resolve({
      id: 1,
      email: 'hristo@devlabs.bg',
      name: 'Hrosto Eftimov',
      authToken: 'amfl'
    })
  }
}

const ACTION_HANDLERS = {
  [SET_USER]: (state, action) => Object.assign({}, action.user)
}

const storedUser = localStorage.getItem('USER')
const defaultUser = storedUser ? JSON.parse(storedUser) : {}
export default (state = defaultUser, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
