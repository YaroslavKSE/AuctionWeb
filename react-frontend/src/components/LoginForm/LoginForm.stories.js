import React from 'react'
import LoginForm from './LoginForm'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <LoginForm {...args} />

export const Default = Template.bind({})

export const WithError = Template.bind({})
WithError.args = {
  error: 'Invalid email or password'
}
