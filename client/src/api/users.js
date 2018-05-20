import axios from './index'

const getMe = () => axios.get('/users/me')

export default {
  getMe
}
