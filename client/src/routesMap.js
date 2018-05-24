import classes from './thunks/classes'

export default {
  FORBIDDEN: '/forbidden',
  LOGIN: {
    path:'/login',
    thunk: (dispatch, getState) => {}
  },
  MAIN: {
    path: '/',
    thunk: (dispatch, getState) => {}
  },
  CLASSES: {
    path: '/classes',
    thunk: (dispatch, getState) => {
      dispatch(classes.getClasses())
    }
  },
  CLASS: {
    path: '/classes/:id',
    thunk: (dispatch, getState) => {
      const { id } = getState().location.payload
      dispatch(classes.getClass(id))
    }
  },
}
