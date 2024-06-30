import React, { useState } from 'react'
import NumberInput from './NumberInput'

export default {
  title: 'Components/NumberInput',
  component: NumberInput
}

const Template = (args) => {
  const [value, setValue] = useState(args.value)

  const handleChange = (e) => {
    setValue(e.target.value)
    args.onChange(e)
  }

  return <NumberInput {...args} value={value} onChange={handleChange} />
}

export const Default = Template.bind({})
Default.args = {
  label: 'Enter a number:',
  value: '0',
  onChange: (e) => console.log(e.target.value)
}

export const WithInitialValue = Template.bind({})
WithInitialValue.args = {
  label: 'Enter a number:',
  value: '42',
  onChange: (e) => console.log(e.target.value)
}
