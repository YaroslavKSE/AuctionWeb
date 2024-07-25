import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import TextInput from '../components/TextInput/TextInput'
import SelectInput from '../components/SelectInput/SelectInput'
import ImageInput from '../components/ImageInput/ImageInput'
import TextAreaInput from '../components/TextAreaInput/TextAreaInput'
import NumberInput from '../components/NumberInput/NumberInput'
import Button from '../components/Button/Button'
import Popup from '../components/Popup/Popup'
import Alert from '../components/Alert/Alert'
import { createListing } from '../api'
import { AuthContext } from '../../context/AuthContext'
import './styles/CreateListingPage.css'

const CreateListingPage = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [currency, setCurrency] = useState('')
  const [images, setImages] = useState([])
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showAuthAlert, setShowAuthAlert] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [showValidationAlert, setShowValidationAlert] = useState(false)

  const currencyOptions = [
    { value: 'UAH', label: 'UAH' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' }
  ]

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthAlert(true)
      const timer = setTimeout(() => {
        navigate('/login')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, navigate])

  const validateForm = () => {
    const errors = {}
    if (title.trim() === '') errors.title = 'Title is required'
    if (currency === '') errors.currency = 'Currency is required'
    if (description.trim() === '') errors.description = 'Description is required'
    if (price.trim() === '') errors.price = 'Starting bid is required'
    if (isNaN(Number(price)) || Number(price) <= 0) errors.price = 'Starting bid must be a positive number'
    if (images.length === 0) errors.images = 'At least one image is required'

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      setShowAuthAlert(true)
      return
    }
    if (validateForm()) {
      setIsPopupOpen(true)
    } else {
      setShowValidationAlert(true)
      setTimeout(() => setShowValidationAlert(false), 3000)
    }
  }

  const handleConfirm = async () => {
    try {
      await createListing({
        title,
        description,
        starting_bid: price,
        images,
        currency
      })
      setIsSuccess(true)
      setIsPopupOpen(false)
      // Clear form fields
      setTitle('')
      setCurrency('')
      setImages([])
      setDescription('')
      setPrice('')
      setValidationErrors({})
    } catch (error) {
      console.log(error)
      setErrorMessage(error.error || 'Failed to create listing')
      setIsPopupOpen(false)
    }
  }

  const handleClose = () => {
    setIsPopupOpen(false)
    setIsSuccess(false)
    setErrorMessage('')
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="create-listing-page">
          {showAuthAlert && (
            <Alert
              message="You must be logged in to create a listing. Redirecting to login page..."
              type="warning"
            />
          )}
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="create-listing-page">
        {showValidationAlert && (
          <Alert
            message="Please fill in all the required fields in the form."
            type="error"
          />
        )}
        <form className="create-listing-form" onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={validationErrors.title}
          />
          <ImageInput
            label="Add Images Here"
            images={images}
            setImages={setImages}
            error={validationErrors.images}
          />
          <TextAreaInput
            label="Add Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={validationErrors.description}
          />
          <NumberInput
            label="Set the Starting Bid"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={validationErrors.price}
          />
          <SelectInput
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={currencyOptions}
            error={validationErrors.currency}
          />
          <Button type="submit">Create Listing</Button>
        </form>
        {isPopupOpen && (
          <Popup
            title="Confirm Listing"
            message="Are you sure you want to create this listing?"
            onConfirm={handleConfirm}
            onClose={handleClose}
          />
        )}
        {isSuccess && (
          <Popup
            title="Success"
            message="Your listing has been created!"
            onConfirm={handleClose}
            onClose={handleClose}
          />
        )}
        {errorMessage && (
          <Popup
            title="Error"
            message={errorMessage}
            onConfirm={handleClose}
            onClose={handleClose}
          />
        )}
      </div>
    </Layout>
  )
}

export default CreateListingPage
