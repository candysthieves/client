/** @type {import("stylelint").Config} */
const stylelintConfig = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'coverage/**'],
  overrides: [
    {
      files: ['**/*.css', '**/*.module.css'],
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global', 'local'],
          },
        ],
      },
    },
  ],
};

export default stylelintConfig;
