const workers = process.env.CI ? 2 : 1

module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    require: ['tests/support/hooks.ts', 'tests/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['json:report/cucumber-report.json'],
    retry: 0,
    parallel: workers,
  },
}
