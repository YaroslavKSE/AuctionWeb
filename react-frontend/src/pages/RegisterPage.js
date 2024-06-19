import React from 'react'
import './styles/RegisterPage.css'
import Logo from '../components/Header/Logo/Logo'
import RegisterForm from '../components/RegisterForm/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Logo />
      <h1>Register</h1>
      <RegisterForm />
      <div className="login-link">
        Already registered? <a href="/login">Login</a>
      </div>
    </div>
  )
}

export default RegisterPage
