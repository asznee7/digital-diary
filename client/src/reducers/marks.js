import { handleActions } from 'redux-actions'
import { marks as marksActions } from '../constants'

const initialState = {
  data: null,
  isFetching: false
}

const marks = handleActions({
  [marksActions.GET_MARKS_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [marksActions.GET_MARKS_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [marksActions.GET_MARKS_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

const mark = handleActions({
  [marksActions.GET_MARK_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [marksActions.GET_MARK_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [marksActions.GET_MARK_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

const postMark = handleActions({
  [marksActions.POST_MARK_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [marksActions.POST_MARK_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [marksActions.POST_MARK_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

const putMark = handleActions({
  [marksActions.PUT_MARK_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [marksActions.PUT_MARK_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [marksActions.PUT_MARK_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)


export {
  marks,
  mark,
  postMark,
  putMark
}
