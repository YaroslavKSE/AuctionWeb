import React from 'react'
import RegisterForm from './RegisterForm'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components/RegisterForm',
  component: RegisterForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <RegisterForm {...args} />

export const Default = Template.bind({})

export const WithError = Template.bind({})
WithError.args = {
  error: 'Passwords do not match'
}
