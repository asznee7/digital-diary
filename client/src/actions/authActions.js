import { LOGIN, LOGOUT } from './types'
const securityUri = 'http://localhost:3000/api/v1/security/'

export const login = credentials => dispatch => {
  fetch(securityUri + 'login', {
    body: JSON.stringify(credentials),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
    .then(user => dispatch({
      type: LOGIN,
      payload: user
    }))
}

export const logout = () => dispatch => {
  fetch(securityUri + 'logout')
    .then(res => res.json())
    .then(user => dispatch({
      type: LOGOUT
    }))
}
