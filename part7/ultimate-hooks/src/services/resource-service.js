import axios from 'axios'

const getAll = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const create = async (url, resource) => {
  const response = await axios.post(url, resource)
  return response.data
}

export default { getAll, create }
