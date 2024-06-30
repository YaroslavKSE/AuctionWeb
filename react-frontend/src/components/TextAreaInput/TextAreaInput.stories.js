import React, { useState } from 'react'
import TextAreaInput from './TextAreaInput'

export default {
  title: 'Components/TextAreaInput',
  component: TextAreaInput
}

const Template = (args) => {
  const [value, setValue] = useState(args.value)

  const handleChange = (e) => {
    setValue(e.target.value)
    args.onChange(e)
  }

  return <TextAreaInput {...args} value={value} onChange={handleChange} />
}

export const Default = Template.bind({})
Default.args = {
  label: 'Description',
  value: '',
  onChange: (e) => console.log(e.target.value)
}

export const WithInitialValue = Template.bind({})
WithInitialValue.args = {
  label: 'Description',
  value: 'This is an initial value.',
  onChange: (e) => console.log(e.target.value)
}
