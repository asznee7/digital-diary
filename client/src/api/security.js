import axios from './index'

const login = (credentials) => axios.post('/security/login', credentials)
const logout = () => axios.post('/security/logout')

export default {
  login,
  logout
}
