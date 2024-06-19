import React from 'react'
import TextInput from './TextInput'

export default {
  title: 'TextInput',
  component: TextInput
}

export const Default = () => (
  <TextInput type="text" placeholder="Placeholder" value="" onChange={() => {}} />
)
