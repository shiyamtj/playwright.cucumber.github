import reporter from 'cucumber-html-reporter'
let browser: string = process.env.BROWSER || 'chromium'

reporter.generate({
  brandTitle: 'Test Execution Report',
  theme: 'bootstrap',
  jsonFile: 'report/cucumber-report.json',
  output: 'report/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  columnLayout: 2,
  screenshotsDirectory: 'report/screenshots/',
  storeScreenshots: true,
  ignoreBadJsonFile: true,

  metadata: {
    'App Version': '0.3.2',
    'Test Environment': 'STAGING',
    Browser: browser,
    // Platform: 'Windows 10',
  },
})
