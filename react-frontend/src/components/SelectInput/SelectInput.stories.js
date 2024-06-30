import React, { useState } from 'react'
import SelectInput from './SelectInput'

export default {
  title: 'Components/SelectInput',
  component: SelectInput
}

const Template = (args) => {
  const [value, setValue] = useState(args.value)

  const handleChange = (e) => {
    setValue(e.target.value)
    args.onChange(e)
  }

  return <SelectInput {...args} value={value} onChange={handleChange} />
}

export const Default = Template.bind({})
Default.args = {
  label: 'Category',
  value: '',
  onChange: (e) => console.log(e.target.value)
}

export const WithSelectedValue = Template.bind({})
WithSelectedValue.args = {
  label: 'Category',
  value: 'category2',
  onChange: (e) => console.log(e.target.value)
}
