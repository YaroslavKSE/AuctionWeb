import React, { useState, useContext } from 'react'
import './LoginForm.css'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api'
import TextInput from '../TextInput/TextInput'
import Button from '../Button/Button'
import Error from '../Error/Error'
import { AuthContext } from '../../../context/AuthContext'
import PropTypes from 'prop-types'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { updateAuthState } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      await updateAuthState()
      navigate('/active-listings')
    } catch (error) {
      setError(error.message || 'An unexpected error occurred')
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <Error message={error} />}
      <TextInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  )
}

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string
}

export default LoginForm
