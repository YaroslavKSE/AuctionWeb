/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules with given rule
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  esModule: false,
                  modules: {
                    localIdentName: '[local]--[name]--[hash:base64:5]'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  }
}
export default config