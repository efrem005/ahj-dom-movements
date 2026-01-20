module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/src/js/__mocks__/styleMock.js",
    "\\.(png|svg|jpg|jpeg|gif)$": "<rootDir>/src/js/__mocks__/fileMock.js",
  },
};

