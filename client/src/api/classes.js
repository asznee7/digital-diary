import axios from './index'

const getClasses = () => axios.get('/classes')
const getClass = (id) => axios.get('/classes/' + id)

export default {
  getClasses,
  getClass
}
