export default {
  nodeResolve: true,
  files: ['/**/*.test.js'],
  testFramework: {
    config: {
      timeout: '5000',
    },
  },
};
