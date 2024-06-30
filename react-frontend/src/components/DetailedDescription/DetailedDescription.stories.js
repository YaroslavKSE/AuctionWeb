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

export const LongDescription = Template.bind({})
LongDescription.args = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. 
  Nulla facilisi. Donec volutpat mauris vitae felis interdum, ut scelerisque nisi faucibus. 
  Phasellus placerat lorem et magna consectetur, quis cursus justo mollis.`
}
