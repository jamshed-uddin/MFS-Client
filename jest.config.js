/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});
const config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  collectCoverage: false,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  testEnvironment: "jsdom",

  // transform: {
  //   "^.+\\.(js|jsx)$": "babel-jest",
  // },

  // transformIgnorePatterns: ["node_modules/(?!@uidotdev/usehooks)"],
};

export default createJestConfig(config);
