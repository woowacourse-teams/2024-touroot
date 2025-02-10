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
    "^@mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@type/(.*)$": "<rootDir>/src/types/$1",
    "^@queries/(.*)$": "<rootDir>/src/queries/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/__tests__/constants/", "<rootDir>/__tests__/utils/"],
  /* 
    msw v2를 사용 시 별도의 polyfills 설정이 필요함
    (https://mswjs.io/docs/migrations/1.x-to-2.x/#frequent-issues)
  */
  setupFiles: ["./jest.polyfills.js"],
  setupFilesAfterEnv: ["./jest-setup.ts"],

  testEnvironmentOptions: {
    customExportConditions: [""],
  },
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
