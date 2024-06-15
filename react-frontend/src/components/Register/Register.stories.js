import React from 'react'
import Register from './Register'

export default {
  title: 'Components/Register',
  component: Register,
  tags: ['autodocs']
}

export const Default = () => <Register onSuccess={() => alert('Redirect to login')} />
