import React from 'react'
import Login from './Login'

export default {
  title: 'Components/Login',
  component: Login,
  tags: ['autodocs']
}

export const Default = () => <Login onSuccess={() => alert('Redirect to listings page')} />
