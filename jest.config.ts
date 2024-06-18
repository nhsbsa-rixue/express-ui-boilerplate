export default {
  clearMocks: true,
  verbose: true,
  testMatch: ["**/*.test.ts"],
  moduleDirectories: ["node_modules"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  transform: {},
  // Add more configurations here
};
