import React from 'react'
import CreateListingPage from '../CreateListingPage'
import { MemoryRouter } from 'react-router-dom'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Pages/CreateListingPage',
  component: CreateListingPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <CreateListingPage {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithPopup = Template.bind({})
WithPopup.args = {}

const createListingMock = (listing) => {
  action('createListing')(listing)
  return Promise.resolve()
}

export const FormSubmission = Template.bind({})
FormSubmission.args = {
  createListing: createListingMock
}
