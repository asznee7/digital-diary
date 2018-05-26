import { handleActions } from 'redux-actions'
import { classes as classesActions } from '../constants'

const initialState = {
  data: null,
  isFetching: false
}

const classes = handleActions({
  [classesActions.GET_CLASSES_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [classesActions.GET_CLASSES_SUCCESS]: (state, action) => {
    const { classesIds } = action.payload
    if (classesIds) {
      let { entities } = action.payload.payload
      let classes = entities.filter((item) => classesIds.includes(item.id) ? item : null)
      return Object.assign({}, state, {data: { entities: classes, count: entities.length }, isFetching: false})
    }
    else
      return Object.assign({}, state, { data: action.payload.payload, isFetching: false })
  },
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
