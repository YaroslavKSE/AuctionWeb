import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

// Configure axios to include credentials
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This ensures cookies are sent with each request
  headers: {
    'Content-Type': 'application/json'
  }
})

export const register = async (email, password, name, surname) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
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
    const response = await axiosInstance.post('/auth/login', { email, password })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getListings = async () => {
  try {
    const response = await axiosInstance.get('/listings')
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const createListing = async (listingData) => {
  try {
    const response = await axiosInstance.post('/listings', listingData)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
