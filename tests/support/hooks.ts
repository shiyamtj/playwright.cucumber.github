import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber'
import {
  chromium,
  Page,
  BrowserContext,
  firefox,
  webkit,
  Browser,
} from '@playwright/test'

// import reporter from 'cucumber-html-reporter'

declare global {
  var browser: Browser
}

let browser: string = process.env.BROWSER || 'chromium'

// Runs once before all tests
BeforeAll(async function () {
  const isHeadless = process.env.CI ? true : false

  switch (browser) {
    case 'chromium':
      {
        global.browser = await chromium.launch({
          headless: isHeadless,
          args: ['--start-maximized'],
        })
      }
      break
    case 'firefox':
      {
        global.browser = await firefox.launch({
          headless: isHeadless,
          args: ['--kiosk'],
        })
      }
      break
    case 'webkit':
      {
        global.browser = await webkit.launch({
          headless: isHeadless,
        })
      }
      break
    default:
      throw new Error(`Unsupported browser: ${browser}`)
  }
})

// Runs once after all tests
AfterAll(async function () {
  await global.browser.close()

  // setTimeout(() => {
  //   // reporter.generate({
  //   //   brandTitle: 'Test Execution Report',
  //   //   theme: 'bootstrap',
  //   //   jsonDir: 'report',
  //   //   output: 'report/cucumber-report.html',
  //   //   reportSuiteAsScenarios: true,
  //   //   scenarioTimestamp: true,
  //   //   launchReport: false,
  //   //   columnLayout: 2,
  //   //   screenshotsDirectory: 'report/screenshots/',
  //   //   storeScreenshots: true,
  //   //   ignoreBadJsonFile: true,

  //   //   metadata: {
  //   //     'App Version': '0.3.2',
  //   //     'Test Environment': 'STAGING',
  //   //     Browser: browser,
  //   //     // Platform: 'Windows 10',
  //   //   },
  //   // })
  //   process.exit(0)
  // }, 1000)
})

// Runs before each scenario
Before(async function () {
  const browser = global.browser as Browser
  const browserContext: BrowserContext = await browser.newContext({
    timezoneId: 'Pacific/Auckland',
    locale: 'en-NZ',
  })
  const page: Page = await browserContext.newPage()

  this.browserContext = browserContext
  this.page = page
})

// Runs after each scenario
After(async function () {
  const page: Page = this.page as Page
  const browserContext: BrowserContext = this.browserContext

  const screenshot = await page.screenshot({ fullPage: true })
  this.attach(screenshot, 'image/png')

  await page.close()
  await browserContext.close()
})
