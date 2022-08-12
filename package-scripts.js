module.exports = {
    scripts: {
        test: {
            default: `jest`,
            watch: "jest --watch",
        },
        build: {
            default: `tsc`,
        },
        lint: {
            default: 'eslint --fix "src/**/*.ts" --ignore-pattern node_modules/',
        },
        prepare: {
            default: "yarn start build",
        },
        prepublishOnly: {
            default: "yarn test && yarn start lint",
        },
    },
    options: {
        silent: false,
    },
};
