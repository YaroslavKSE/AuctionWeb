import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './RegisterForm.css'
import TextInput from '../TextInput/TextInput'
import Button from '../Button/Button'
import Error from '../Error/Error'
import { register } from '../../api'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      await register(email, password, name, surname)
      navigate('/login')
    } catch (err) {
      setError(error.message || 'An unexpected error occurred')
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {error && <Error message={error} />}
      <TextInput
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
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
      <TextInput
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type="submit">Register</Button>
    </form>
  )
}

RegisterForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  error: PropTypes.string
}

export default RegisterForm
