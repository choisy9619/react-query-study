module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^@hooks/(.*)': '<rootDir>/src/hooks/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: './tests/custom.js',
    testPathIgnorePatterns: [
        '<rootDir>/.next/',
        '<rootDir>/cypress/',
        '<rootDir>/node_modules/',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
};
