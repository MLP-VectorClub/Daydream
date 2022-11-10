/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  globals: {},
};
