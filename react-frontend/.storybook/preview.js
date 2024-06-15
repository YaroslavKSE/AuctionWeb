/** @type { import('@storybook/react').Preview } */
import '../src/components/Login/Login.css'
import '../src/components/Register/Register.css'
import '../src/components/Listings/Listings.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
