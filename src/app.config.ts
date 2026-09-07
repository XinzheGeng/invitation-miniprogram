export default defineAppConfig({
  pages: ['pages/cover/index', 'pages/home/index'],
  subPackages: ['story', 'gallery', 'day', 'weekend'].map(name => ({
    root: `packages/${name}`, name, pages: ['pages/index/index'],
  })),
  window: {
    navigationStyle: 'custom',
    navigationBarTitleText: '一线良辰',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f4efe4',
    backgroundTextStyle: 'dark',
  },
  lazyCodeLoading: 'requiredComponents',
  // No location API is enabled until real places and platform eligibility are verified.
});
