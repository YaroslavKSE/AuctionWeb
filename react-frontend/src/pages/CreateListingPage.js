import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import TextInput from '../components/TextInput/TextInput'
import SelectInput from '../components/SelectInput/SelectInput'
import ImageInput from '../components/ImageInput/ImageInput'
import TextAreaInput from '../components/TextAreaInput/TextAreaInput'
import NumberInput from '../components/NumberInput/NumberInput'
import Button from '../components/Button/Button'
import Popup from '../components/Popup/Popup'
import { createListing } from '../api'
import './styles/CreateListingPage.css'

const CreateListingPage = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsPopupOpen(true)
  }

  const handleConfirm = async () => {
    try {
      await createListing({
        title,
        description,
        starting_bid: price,
        images,
        categories: category ? [category] : []
      })
      setIsSuccess(true)
      setIsPopupOpen(false)
      // Clear form fields
      setTitle('')
      setCategory('')
      setImages([])
      setDescription('')
      setPrice('')
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

  return (
    <Layout>
      <div className="create-listing-page">
        <form className="create-listing-form" onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <SelectInput
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <ImageInput label="Add Images Here" images={images} setImages={setImages} />
          <TextAreaInput
            label="Add Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <NumberInput
            label="Set the Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
