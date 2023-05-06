module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
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
			2,
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
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
};
