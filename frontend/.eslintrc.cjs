module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'plugin:import/typescript'],
	plugins: ['svelte3', '@typescript-eslint', 'import'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	rules: {
		"no-unused-vars": "off",
		"no-use-before-define": "off",
		"max-len": [
			"warn",
			{
				"code": 120,
				"tabWidth": 4
			}
		],
		"indent": [
			"error",
			4
		],
		"import/extensions": "off",
		"import/prefer-default-export": "off",
		"import/order": [
			"error",
			{
				"alphabetize": {
					"order": "asc",
					"caseInsensitive": true
				},
				"groups": [
					"builtin",
					"external",
					[
						"parent", "internal"
					],
					"sibling",
					[
						"unknown", "index", "object"
					]
				],
				"pathGroups": [
					{
						"pattern": "~/**",
						"group": "internal"
					}
				],
				"newlines-between": "always"
			}
		],
		"import/no-unresolved": "off",
		"keyword-spacing": "error",
		"quotes": [
			"error",
			"single"
		],
		"no-console": [
			"error",
			{
				"allow": [
					"warn",
					"error"
				]
			}
		],
		"semi": "off",
		"space-before-blocks": "error",
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": [
			"error"
		],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/semi": ["error"],
		"@typescript-eslint/type-annotation-spacing": [
			"error",
			{
				"before": false,
				"after": true,
				"overrides": {
					"colon": {
						"before": false,
						"after": true
					},
					"arrow": {
						"before": true,
						"after": true
					}
				}
			}
		],

	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
