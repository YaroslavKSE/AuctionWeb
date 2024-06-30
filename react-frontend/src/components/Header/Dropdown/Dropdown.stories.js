import React from 'react'
import Dropdown from './Dropdown'

export default {
  title: 'Components/Dropdown',
  component: Dropdown
}

const Template = (args) => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {}
