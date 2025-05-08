module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};
