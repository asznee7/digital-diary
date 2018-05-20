import { redirect } from 'redux-first-router'
import classes from './thunks/classes'

export default {
  FORBIDDEN: '/forbidden',
  LOGIN: '/login',
  CLASSES: {
    path: '/classes',
    thunk: (dispatch, getState) => {
      dispatch(classes.getClasses())
    }
  },
  MAIN: {
    path: '/',
    thunk: (dispatch, getState) => {
      //
      //const { me } = getState()
      //if(!me.data) dispatch(redirect({ type: 'LOGIN'}))
    }
  }
}
