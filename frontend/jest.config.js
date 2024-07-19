module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@apis/(.*)$": "<rootDir>/src/apis/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/__tests__/constants/", "<rootDir>/__tests__/utils/"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-results",
        outputName: "results.xml",
      },
    ],
  ],
};
