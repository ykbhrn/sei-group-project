import axios from 'axios'
import { getToken } from './auth'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const getAllPlants = () => {
  return axios.get('/api/plants')
}

export const getSinglePlant = id => {
  return axios.get(`/api/plants/${id}`)
}

export const newPlant = formData => {
  return axios.post('/api/plants', formData, withHeaders())
}

export const editPlant = (id, formData) => {
  return axios.put(`/api/plants/${id}`, formData,withHeaders())
}

export const deletePlant = id => {
  return axios.delete(`/api/plants/${id}`, withHeaders())
}

export const registerUser = formData => {
  return axios.post(`/api/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`/api/login`, formData)
}

export const getTrefleData = query => {
  return axios.post('/api/trefle', {search: query} )
}
export const getPortfolio = () => {
  return axios.get('/api/profile', withHeaders())
}

export const getPublicPortfolio = id => {
  return axios.get(`/api/profile/${id}`)
}


