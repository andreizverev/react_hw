import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
	...fsd.configs.recommended,
	{
		// disable the `public-api` rule for files in the Shared layer
		files: ['./src/**'],
		rules: {
			'fsd/repetitive-naming': 'off',
			'fsd/public-api': 'off',
			'fsd/no-public-api-sidestep': 'off',
			'fsd/insignificant-slice': 'off',
		},
	},
	{
		files: ['./src/shared/store.ts'],
		rules: {
			'fsd/forbidden-imports': 'off',
		},
	},
]);
