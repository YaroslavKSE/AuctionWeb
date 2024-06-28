import React from 'react'
import PreviousBids from './PreviousBids'

export default {
  title: 'Components/PreviousBids',
  component: PreviousBids
}

const Template = (args) => <PreviousBids {...args} />

export const Default = Template.bind({})
Default.args = {
  bids: [
    { id: '1', amount: 100, user_id: 'User1' },
    { id: '2', amount: 150, user_id: 'User2' }
  ]
}
