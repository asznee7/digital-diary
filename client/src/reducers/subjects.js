import { handleActions } from 'redux-actions'
import { subjects as subjectsActions } from '../constants'

const initialState = {
  data: null,
  isFetching: false
}

const subjects = handleActions({
  [subjectsActions.GET_SUBJECTS_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [subjectsActions.GET_SUBJECTS_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [subjectsActions.GET_SUBJECTS_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

const subject = handleActions({
  [subjectsActions.GET_SUBJECT_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [subjectsActions.GET_SUBJECT_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [subjectsActions.GET_SUBJECT_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

export {
  subjects,
  subject
}
