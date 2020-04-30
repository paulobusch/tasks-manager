const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
    bail: true,
    roots: ["<rootDir>"],
    transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
    testRegex: "(/tests/routers/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    coverageReporters: ["html"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**", "!src/utils/**"],
    coverageDirectory: "tests/coverage",
    globals: {
        'ts-jest': {
            tsConfig: "tsconfig.json"
        }
    },
    moduleNameMapper
};