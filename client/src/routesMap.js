import classes from './thunks/classes'
import marks from './thunks/marks'
import subjects from './thunks/subjects'

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
    thunk: (dispatch, getState) => {}
  },
  CLASS: {
    path: '/classes/:id',
    thunk: (dispatch, getState) => {
      const { id } = getState().location.payload
      dispatch(classes.getClass(id))
      dispatch(marks.getMarks())
    }
  },
  STUDENT_CLASS: {
    path: '/class',
    thunk: (dispatch, getState) => {}
  },
  STUDENT_MARKS: {
    path: '/marks',
    thunk: (dispatch, getState) => {
      dispatch(subjects.getSubjects())
      dispatch(marks.getMarks())
    }
  }
}
