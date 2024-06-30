import React from 'react'
import Header from './Header'
import { AuthContext } from '../../../context/AuthContext'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}

const Template = (args) => (
  <AuthContext.Provider value={args.authContextValue}>
    <Header {...args} />
  </AuthContext.Provider>
)

export const NotAuthenticated = Template.bind({})
NotAuthenticated.args = {
  authContextValue: {
    isAuthenticated: false,
    user: null
  }
}

export const Authenticated = Template.bind({})
Authenticated.args = {
  authContextValue: {
    isAuthenticated: true,
    user: { name: 'John Doe' }
  }
}
