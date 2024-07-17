import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Nav from './Nav'

export default {
  title: 'Components/Nav',
  component: Nav,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <Nav {...args} />

export const Default = Template.bind({})
Default.args = {}
