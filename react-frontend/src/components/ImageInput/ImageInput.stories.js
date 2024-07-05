import React, { useState } from 'react'
import ImageInput from './ImageInput'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/ImageInput',
  component: ImageInput
}

const Template = (args) => {
  const [images, setImages] = useState([])

  return <ImageInput {...args} images={images} setImages={setImages} />
}

export const Default = Template.bind({})
Default.args = {
  label: 'Upload Images',
  images: [],
  setImages: action('setImages')
}

export const WithImages = Template.bind({})
WithImages.args = {
  label: 'Upload Images',
  images: [
    'https://img.halooglasi.com/slike/oglasi/Thumbs/240123/m/nov-iphone-14-pro-maxiphone-15-plus-5425644090539-71806920706.jpg',
    'https://auction-images.fra1.cdn.digitaloceanspaces.com/auction-images/iphone.jpg'
  ],
  setImages: action('setImages')
}
