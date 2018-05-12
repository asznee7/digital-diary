import { LOGIN, LOGOUT } from '../actions/types'

const initialState = {
  loggedUser: {}
}

export default function (state = initialState, action) {
  switch(action.type){
    case LOGIN:
      return {
        ...state,
        loggedUser: action.payload
      }
    case LOGOUT:
      return state
    default:
      return state
  }
}