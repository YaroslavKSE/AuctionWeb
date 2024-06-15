import React from 'react'
import Register from '../components/Register/Register'

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="logo">Logo here</div>
      <Register onSuccess={() => (window.location.href = '/login')} />
    </div>
  )
}

export default RegisterPage
