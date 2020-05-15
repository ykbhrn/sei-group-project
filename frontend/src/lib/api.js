import axios from 'axios'

export const getAllPlants = () => {
  return axios.get('/api/plants')
}

export const newPlant = formData => {
  return axios.post(`/api/plants`, formData)
}