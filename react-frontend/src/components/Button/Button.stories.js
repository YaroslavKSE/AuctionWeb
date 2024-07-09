import React from 'react'
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  type: 'button',
  children: 'Primary Button'
}

export const Submit = Template.bind({})
Submit.args = {
  type: 'submit',
  children: 'Submit Button'
}

export const Custom = Template.bind({})
Custom.args = {
  type: 'button',
  children: 'Custom Button'
}

export const Transparent = Template.bind({})
Transparent.args = {
  type: 'button',
  children: 'Transparent Button',
  variant: 'transparent'
}
