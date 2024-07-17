import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import NavLink from './NavLink'

export default {
  title: 'Components/NavLink',
  component: NavLink,
  decorators: [
    (Story, context) => (
      <MemoryRouter initialEntries={[context.args.href]}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <NavLink {...args} />

export const Default = Template.bind({})
Default.args = {
  href: '/categories',
  label: 'Categories'
}

export const Active = Template.bind({})
Active.args = {
  href: '/active-listings',
  label: 'Active Listings'
}
