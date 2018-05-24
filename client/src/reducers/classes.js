import { handleActions } from 'redux-actions'
import { classes as classesActions } from '../constants'

const initialState = {
  data: null,
  isFetching: false
}

const classes = handleActions({
  [classesActions.GET_CLASSES_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [classesActions.GET_CLASSES_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [classesActions.GET_CLASSES_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

const oneClass = handleActions({
  [classesActions.GET_CLASS_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [classesActions.GET_CLASS_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [classesActions.GET_CLASS_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

export {
  classes,
  oneClass
}
