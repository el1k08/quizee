import { AUTH_SUCCESS, AOTH_LOGOUT } from '../actions/actionType'

const initialState = {
  token: null
}


export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token
      }
    case AOTH_LOGOUT:
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}