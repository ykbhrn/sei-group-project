import axio from 'axios'
import Axios from 'axios'

export const getAllPlants = () => {
  return Axios.get('/api/plants')
}

export const newPlant = formData => {
  return Axios.post(`/api/plants`, formData)
}