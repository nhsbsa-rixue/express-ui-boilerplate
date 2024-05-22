export default {
  clearMocks: true,
  verbose: true,
  testMatch: ["**/*.test.js"],
  moduleDirectories: ["node_modules"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  transform: {},
  // Add more configurations here
};
