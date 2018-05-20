import { createActions } from 'redux-actions'

export const {
  getMeRequest,
  getMeSuccess,
  getMeFailure
} = createActions({
  GET_ME_REQUEST: undefined,
  GET_ME_SUCCESS: payload => payload,
  GET_ME_FAILURE: payload => payload
})
