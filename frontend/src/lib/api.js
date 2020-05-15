import axios from 'axios'

export const getAllPlants = () => {
  return axios.get('/api/plants')
}

export const newPlant = formData => {
  return axios.post('/api/plants', formData)
}

export const getSinglePlant = id => {
  return axios.get(`/api/plants/${id}`)
}

export const editPlant = (id, formData) => {
  return axios.put(`/api/plants/${id}`, formData)
}

export const deletePlant = id => {
  return axios.delete(`/api/plants/${id}`)
}

export const registerUser = formData => {
  return axios.post(`/api/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`/api/login`, formData)
}

