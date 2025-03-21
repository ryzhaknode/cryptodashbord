import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@styles/(.*)$": "<rootDir>/src/styles/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "\\.(css|scss|sass)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};

export default createJestConfig(customJestConfig);

