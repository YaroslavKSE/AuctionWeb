import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './ImageInput.css'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const ImageInput = ({ label, images, setImages }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    const uploadedImages = []
    setIsUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await axios.post(`${API_BASE_URL}/images/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(percentCompleted)
          }
        })
        uploadedImages.push(response.data.imageUrl)
      } catch (error) {
        console.error('Error uploading image:', error)
        alert(`Failed to upload ${file.name}. Please try again.`)
      }
    }

    setImages([...images, ...uploadedImages])
    setIsUploading(false)
    setUploadProgress(0)
  }

  return (
    <div className="image-input">
      <label htmlFor="image-upload">{label}</label>
      <input
        id="image-upload"
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*,.heic,.heif"
      />
      {isUploading && (
        <div className="upload-progress">
          <progress value={uploadProgress} max="100" />
          <span>{uploadProgress}% Uploaded</span>
        </div>
      )}
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
