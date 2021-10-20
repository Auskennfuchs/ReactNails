module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testRegex: '(/src/.*.(test|spec)).(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coveragePathIgnorePatterns: ['(src/.*.mock).(jsx?|tsx?)$'],
    verbose: true,
    projects: ['<rootDir>'],
    coverageDirectory: '<rootDir>/coverage/',
};