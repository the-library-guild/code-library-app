const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
  '^@/components/(.*)$': '<rootDir>/components/$1',
  '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
  '^@/services/(.*)$': '<rootDir>/services/$1',
  '^@/pages/(.*)$': '<rootDir>/pages/$1',
  '^@/helpers/(.*)$': '<rootDir>/helpers/$1',
}
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
