import React from 'react'
import PropTypes from 'prop-types'
import './ImageInput.css'
import axios from 'axios'

const ImageInput = ({ label, images, setImages }) => {
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    const uploadedImages = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('image', file)
      try {
        const response = await axios.post('http://localhost:5000/api/images/upload', formData, {
          // Note the double 'upload'
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        uploadedImages.push(response.data.imageUrl) // Assuming the server returns the image URL
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }

    setImages([...images, ...uploadedImages])
  }

  return (
    <div className="image-input">
      <label>{label}</label>
      <input type="file" multiple onChange={handleImageChange} />
      <div className="image-preview">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index}`} />
        ))}
      </div>
    </div>
  )
}

ImageInput.propTypes = {
  label: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired
}

export default ImageInput
