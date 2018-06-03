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
import { error, success } from 'react-notification-system-redux'
import { notificationOptionsError, notificationOptionsSuccess } from '../utils/notifications'

const getMarks = () => dispatch => {
  dispatch(getMarksRequest())
  marks.getMarks()
    .then(response => dispatch(getMarksSuccess(response.data)))
    .catch(e => {
      dispatch(getMarksFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

const getMark = id => dispatch => {
  dispatch(getMarkRequest())
  marks.getMark(id)
    .then(response => dispatch(getMarkSuccess(response.data)))
    .catch(e => {
      dispatch(getMarkFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

const postMark = data => dispatch => {
  dispatch(postMarkRequest())
  marks.postMark(data)
    .then(response => {
      dispatch(postMarkSuccess(response.data))
      dispatch(getMarks())
      dispatch(success(notificationOptionsSuccess('Mark has been added successfully')))
    })
    .catch(e => {
      dispatch(postMarkFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

const putMark = (id, data) => dispatch => {
  dispatch(putMarkRequest())
  marks.putMark(id, data)
    .then(response => {
      dispatch(putMarkSuccess(response.data))
      dispatch(getMarks())
      dispatch(success(notificationOptionsSuccess('Mark has been updated successfully')))
    })
    .catch(e => {
      dispatch(putMarkFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

export default {
  getMarks,
  getMark,
  postMark,
  putMark
}
