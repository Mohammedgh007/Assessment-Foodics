module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.vue$': '@vue/vue2-jest',
        '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: [
        '**/tests/**/*.test.js',
    ],
    transformIgnorePatterns: [
        '/node_modules/(?!vue)'
    ]
}