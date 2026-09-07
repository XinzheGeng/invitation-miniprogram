import { defineConfig } from '@tarojs/cli';
import dev from './dev';
import prod from './prod';

export default defineConfig<'webpack5'>((merge, { mode }) => merge({
  projectName: 'invitation-miniprogram',
  date: '2026-09-07',
  designWidth: 375,
  deviceRatio: { 375: 2 },
  sourceRoot: 'src',
  outputRoot: 'dist',
  framework: 'react',
  compiler: { type: 'webpack5', prebundle: { enable: false }, errorLevel: 1 },
  cache: { enable: false },
  plugins: ['@tarojs/plugin-platform-weapp'],
  // Explicit paths keep chapter photos in their ordinary subpackages.
  copy: {
    patterns: [
      { from: 'src/assets', to: 'dist/assets' },
      ...['story', 'gallery', 'day', 'weekend'].map(name => ({
        from: `src/packages/${name}/assets`, to: `dist/packages/${name}/assets`,
      })),
    ],
    options: {},
  },
  mini: {
    postcss: { pxtransform: { enable: true }, url: { enable: true, config: { limit: 0 } } },
  },
}, mode === 'production' ? prod : dev));
