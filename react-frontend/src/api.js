import axios from 'axios'

// Get the API base URL from the environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

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

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout')
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

export const getListingById = async (listingId) => {
  const response = await axios.get(`${API_BASE_URL}/listings/${listingId}`)
  return response.data
}

export const getBidsByListingId = async (listingId) => {
  const response = await axios.get(`${API_BASE_URL}/bids/${listingId}`)
  return response.data
}

export const placeBid = async (listingId, amount) => {
  try {
    const response = await axiosInstance.post(`/bids/${listingId}/place`, { amount })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const addToWatchlist = async (listingId) => {
  const response = await axios.post(`${API_BASE_URL}/watchlist/add`, { listing_id: listingId })
  return response.data
}
