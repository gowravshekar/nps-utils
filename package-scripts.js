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
            default: "npm run build",
        },
        prepublishOnly: {
            default: "npm test && npm run lint",
        },
    },
    options: {
        silent: false,
    },
};
