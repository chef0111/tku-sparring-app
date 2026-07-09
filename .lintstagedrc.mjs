import path from 'node:path';

const buildEslintCommand = (filenames) =>
  `eslint --fix --cache --cache-location .eslintcache ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' ')}`;

/**
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.{html,json,css,scss,md,mdx}': 'prettier --write',
};

export default lintStagedConfig;
