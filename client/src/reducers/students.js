import { handleActions } from 'redux-actions'
import { students as studentsActions } from '../constants'

const initialState = {
  data: null,
  isFetching: false
}

const students = handleActions({
  [studentsActions.GET_STUDENTS_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [studentsActions.GET_STUDENTS_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [studentsActions.GET_STUDENTS_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

const student = handleActions({
  [studentsActions.GET_STUDENT_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [studentsActions.GET_STUDENT_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [studentsActions.GET_STUDENT_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

export {
  students,
  student
}
