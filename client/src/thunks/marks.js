import {
  getMarksRequest,
  getMarksSuccess,
  getMarksFailure,
  getMarkRequest,
  getMarkSuccess,
  getMarkFailure,
  postMarkRequest,
  postMarkSuccess,
  postMarkFailure,
  putMarkRequest,
  putMarkSuccess,
  putMarkFailure
} from '../actions/marks'
import marks from '../api/marks'

const getMarks = () => dispatch => {
  dispatch(getMarksRequest())
  marks.getMarks()
    .then(response => dispatch(getMarksSuccess(response.data)))
    .catch(e => dispatch(getMarksFailure(e)))
}

const getMark = id => dispatch => {
  dispatch(getMarkRequest())
  marks.getMark(id)
    .then(response => dispatch(getMarkSuccess(response.data)))
    .catch(e => dispatch(getMarkFailure(e)))
}

const postMark = data => dispatch => {
  dispatch(postMarkRequest())
  marks.postMark(data)
    .then(response => {
      dispatch(postMarkSuccess(response.data))
      dispatch(getMarks())
    })
    .catch(e => dispatch(postMarkFailure(e)))
}

const putMark = (id, data) => dispatch => {
  dispatch(putMarkRequest())
  marks.putMark(id, data)
    .then(response => {
      dispatch(putMarkSuccess(response.data))
      dispatch(getMarks())
    })
    .catch(e => dispatch(putMarkFailure(e)))
}

export default {
  getMarks,
  getMark,
  postMark,
  putMark
}
