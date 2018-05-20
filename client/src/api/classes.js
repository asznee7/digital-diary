import axios from './index'

const getClasses = () => axios.get('/classes')

export default {
  getClasses
}
