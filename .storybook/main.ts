import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.mdx',
    '../src/stories/**/*.mdx', // шляхи до вашого файлу
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
    // інші шляхи до файлів сторіз
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  staticDirs: ['../public'],
};

export default config;
