import React from 'react'
import Login from '../components/Login/Login'

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="logo">Logo here</div>
      <Login onSuccess={() => (window.location.href = '/listings')} />
    </div>
  )
}

export default LoginPage
