module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>[/\\\\](node_modules|.next)[/\\\\]',
    '<rootDir>/.jest/test-utils.tsx',
    '<rootDir>/__mocks__/*'
  ],
  transformIgnorePatterns: ['/node_modules/(?!(@stepperize)/)', '^.+\\.module\\.(css|sass|scss)$'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['next/babel'],
        plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]]
      }
    ]
  },
  watchPlugins: ['jest-watch-typeahead/filename'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.*',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/src/components/**/*.stories.*',
    '!<rootDir>/src/pages/_app.tsx'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/lib(.*)$': '<rootDir>/src/lib$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@/mocks(.*)$': '<rootDir>/__mocks__$1',
    '^@/tests(.*)$': '<rootDir>/.jest$1',
    '^@/app(.*)$': '<rootDir>/src/app$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
