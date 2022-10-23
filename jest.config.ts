// jest.config.js
import nextJest from 'next/jest'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    modulePathIgnorePatterns: ['cypress'],
    moduleNameMapper: {
        '^@context/(.*)': '<rootDir>/src/context/$1',
        '^@components/(.*)': '<rootDir>/src/components/$1',
        '^@lib/(.*)': '<rootDir>/src/lib/$1',
        '^@services/(.*)': '<rootDir>/src/services/$1',
        '^@config': '<rootDir>/config.ts',
        '^@pages/(.*)': '<rootDir>/src/pages/$1'
    },

}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
