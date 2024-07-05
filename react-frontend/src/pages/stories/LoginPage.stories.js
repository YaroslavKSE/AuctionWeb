import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '../LoginPage'

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <LoginPage {...args} />

export const Default = Template.bind({})
Default.args = {}
