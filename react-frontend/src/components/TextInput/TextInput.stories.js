import React, { useState } from 'react'
import TextInput from './TextInput'

export default {
  title: 'Components/TextInput',
  component: TextInput
}

const Template = (args) => {
  const [value, setValue] = useState(args.value)

  const handleChange = (e) => {
    setValue(e.target.value)
    args.onChange(e)
  }

  return <TextInput {...args} value={value} onChange={handleChange} />
}

export const Default = Template.bind({})
Default.args = {
  type: 'text',
  placeholder: 'Enter text',
  value: '',
  onChange: (e) => console.log(e.target.value),
  label: 'Text Input'
}

export const WithInitialValue = Template.bind({})
WithInitialValue.args = {
  type: 'text',
  placeholder: 'Enter text',
  value: 'Initial value',
  onChange: (e) => console.log(e.target.value),
  label: 'Text Input'
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  type: 'text',
  placeholder: 'Enter text',
  value: '',
  onChange: (e) => console.log(e.target.value)
}

export const PasswordInput = Template.bind({})
PasswordInput.args = {
  type: 'password',
  placeholder: 'Enter password',
  value: '',
  onChange: (e) => console.log(e.target.value),
  label: 'Password'
}
