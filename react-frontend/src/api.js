import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export const register = async (email, password, name, surname) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
      name,
      surname
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getListings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listings`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
