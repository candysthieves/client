export default {
  extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      headerPattern:
        /^([A-Z]{2,}-\d+)\s+(init|feat|fix|refactor|test|docs|chore|build|ci|style)(?:\(([^)]*)\))?:\s+(.+)$/,
      headerCorrespondence: ['jira', 'type', 'scope', 'subject'],
    },
  },

  rules: {
    // Disable default rules that produce generic errors
    'type-enum': [0],
    'type-case': [0],
    'type-empty': [0],
    'subject-empty': [0],
    'subject-case': [0],

    'header-max-length': [2, 'always', 100],
    'header-min-length': [2, 'always', 10],

    'jira-required': [2, 'always'],
    'type-format': [2, 'always'],
    'subject-required': [2, 'always'],
  },

  plugins: [
    {
      rules: {
        'jira-required': ({ header }) => {
          const valid = /^[A-Z]{2,}-\d+\s/.test(header)

          return [valid, 'Commit must start with a Jira task. Example: SCRUM-1057']
        },

        'type-format': ({ header }) => {
          const valid =
            /^[A-Z]{2,}-\d+\s+(init|feat|fix|refactor|test|docs|chore|build|ci|style)(?:\([^)]+\))?:/.test(
              header
            )

          return [
            valid,
            'Commit type must be one of: init, feat, fix, refactor, test, docs, chore, build, ci, style. Scope is optional.',
          ]
        },

        'subject-required': ({ header }) => {
          const valid =
            /^[A-Z]{2,}-\d+\s+(init|feat|fix|refactor|test|docs|chore|build|ci|style)(?:\([^)]+\))?:\s+.+/.test(
              header
            )

          return [
            valid,
            'Commit subject is required after ":". Example: SCRUM-1057 feat: add login page',
          ]
        },
      },
    },
  ],
}
