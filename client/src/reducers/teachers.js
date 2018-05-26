import { handleActions } from 'redux-actions'
import { teachers as teachersActions } from '../constants'

const initialState = {
  data: null,
  isFetching: false
}

const teachers = handleActions({
  [teachersActions.GET_TEACHERS_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [teachersActions.GET_TEACHERS_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [teachersActions.GET_TEACHERS_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

const teacher = handleActions({
  [teachersActions.GET_TEACHER_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [teachersActions.GET_TEACHER_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [teachersActions.GET_TEACHER_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

export {
  teachers,
  teacher
}
