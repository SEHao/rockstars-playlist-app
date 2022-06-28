const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  transform: {
    "^.+\\.(ts|mjs|js|html)$": "jest-preset-angular",
  },
  transformIgnorePatterns: [
    `node_modules/(?!@angular|@ngneat/spectator|array-move|lodash-es|nanoid)`,
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
};
