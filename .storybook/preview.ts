import type { Preview } from '@storybook/react'
import "../src/styles/globals.scss";

const preview: Preview = {
  parameters: {
      backgrounds: {
          default: "dark",
          values: [
              {
                  name: 'dark',
                  value: '#16171d'
              },
              {
                  name: 'light',
                  value: '#FFFFFF'
              }
          ]
      },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;