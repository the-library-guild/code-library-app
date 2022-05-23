const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  globalSetup: '<rootDir>/jest.setup.env.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
  '^@/components/(.*)$': '<rootDir>/src/components/$1',
  '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
  '^@/services/(.*)$': '<rootDir>/src/services/$1',
  '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
  '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
  '^@/mocks/(.*)$': '<rootDir>/src/mocks/$1',
}
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
