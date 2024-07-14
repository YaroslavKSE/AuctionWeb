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
  const response = await axiosInstance.get(`/listings/${listingId}`)
  return response.data
}

export const getBidsByListingId = async (listingId) => {
  const response = await axiosInstance.get(`/bids/${listingId}`)
  return response.data
}

export const placeBid = async (listingId, amount) => {
  try {
    const response = await axiosInstance.post(`/bids/${listingId}/place`, { amount })
    return response.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error('Failed to place bid')
    }
  }
}

export const addToWatchlist = async (listingId) => {
  try {
    const response = await axiosInstance.post('/watchlist/add', { listing_id: listingId })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const fetchUserWatchlist = async () => {
  try {
    const response = await axiosInstance.get('/watchlist')
    return response.data.listings
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch watchlist')
  }
}

export const fetchWatchlistIds = async () => {
  try {
    const response = await axiosInstance.get('/watchlist/ids')
    return response.data.listing_ids
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch watchlist IDs')
  }
}

export const removeFromWatchlist = async (listingId) => {
  try {
    const response = await axiosInstance.post('/watchlist/remove', { listing_id: listingId })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getUserListings = async () => {
  try {
    const response = await axiosInstance.get('/listings/user')
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const closeListing = async (listingId) => {
  try {
    const response = await axiosInstance.post(`/listings/${listingId}/close`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
