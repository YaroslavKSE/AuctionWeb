import React from 'react'
import MenuIcon from './MenuIcon'

export default {
  title: 'Components/MenuIcon',
  component: MenuIcon
}

const Template = (args) => <MenuIcon {...args} />

export const Default = Template.bind({})
Default.args = {
  onClick: () => alert('Menu icon clicked')
}
