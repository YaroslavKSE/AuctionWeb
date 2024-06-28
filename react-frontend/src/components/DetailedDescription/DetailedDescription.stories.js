import React from 'react'
import DetailedDescription from './DetailedDescription'

export default {
  title: 'Components/DetailedDescription',
  component: DetailedDescription
}

const Template = (args) => <DetailedDescription {...args} />

export const Default = Template.bind({})
Default.args = {
  description: 'This is a detailed description of the item.'
}
