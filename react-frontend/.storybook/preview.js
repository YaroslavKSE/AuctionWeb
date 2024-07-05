import { initialize, mswDecorator } from 'msw-storybook-addon'
import { handlers } from '../mocks/handlers'

// Initialize MSW
initialize({ onUnhandledRequest: 'bypass' })

export const parameters = {
  msw: handlers,
}

export const decorators = [mswDecorator]
