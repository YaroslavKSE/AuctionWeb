import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import RegisterPage from '../RegisterPage'

export default {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <RegisterPage {...args} />

export const Default = Template.bind({})
Default.args = {}
