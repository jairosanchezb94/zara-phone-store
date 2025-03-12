export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(mjs|[tj]sx?)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
