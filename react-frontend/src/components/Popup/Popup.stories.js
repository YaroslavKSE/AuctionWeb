import React from 'react'
import Popup from './Popup'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Popup',
  component: Popup
}

const Template = (args) => <Popup {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  onConfirm: action('Confirmed'),
  onClose: action('Closed')
}
