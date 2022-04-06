module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: 'espree',
        ecmaVersion: 'latest',
        sourceType: 'module',
        vueFeatures: {
            filter: true,
            interpolationAsNonHTML: false,
        }
    },
    env: { node: true, 'vue/setup-compiler-macros': true },
    extends: [
        // add more generic rulesets here, such as:
        "plugin:vue/essential",
        'eslint:recommended',
        // 'plugin:vue/vue3-recommended',
    ],
    rules: {
        // override/add rules settings here, such as:
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': ['warn', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }],
        'vue/no-multiple-template-root': 'off',
        'vue/no-unused-vars': 'error',
    }
}