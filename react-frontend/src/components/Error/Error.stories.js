import React from 'react'
import Error from './Error'

export default {
  title: 'Components/Error',
  component: Error
}

const Template = (args) => <Error {...args} />

export const Default = Template.bind({})
Default.args = {
  message: 'This is an error message.'
}
