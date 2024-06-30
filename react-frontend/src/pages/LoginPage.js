import React from 'react'
import './styles/LoginPage.css'
import Logo from '../components/Header/Logo/Logo'
import LoginForm from '../components/LoginForm/LoginForm'

const LoginPage = () => {
  return (
    <div className="login-page">
      <Logo className="logo--small" />
      <h1>Login</h1>
      <LoginForm />
      <div className="register-link">
        Not a member yet? <a href="/signup">Register</a>
      </div>
    </div>
  )
}

export default LoginPage
