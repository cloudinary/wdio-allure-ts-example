const { addAttachment } = require("@wdio/allure-reporter").default;
const wdio_allure_ts = require("wdio-allure-ts");

exports.config = {
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  // specs: ['./lib/example/tests/**/*Test.js'],
  suites: {
    todoMvcTestSuite: [
      "./lib/tests/TodoAngularTest.js",
      "./lib/tests/FailingTest.js"
    ]
  },

  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //

  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: "error",
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Warns when a deprecated command is used
  deprecationWarnings: false,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: "./errorShots/",
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: "http://todomvc.com/",
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 60000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 60000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['selenium-standalone'],
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "mocha",
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/reporters/dot.html
  reporters: [
    "dot",
    [
      "allure",
      {
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
      }
    ]
  ],

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: "bdd",
    timeout: 300000 // test timeout, test will fall after 5 minutes on timeout
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  afterTest: function(test) {
    /**
     * Attach browser console logs and html source
     * in case of test failure and close current step
     */
    if (test.passed) {
      wdio_allure_ts.Reporter.closeStep();
      return;
    }

    /**
     * Pass true that indicated failing test
     */
    wdio_allure_ts.Reporter.closeStep(true);

    /**
     * attach browser console logs to the report
     */
    addAttachment(
      "Browser console logs",
      `${JSON.stringify(browser.getLogs("browser"), null, 2)}`
    );
    /**
     * Take screen shot on failure
     * Will be attached to report
     */
    browser.takeScreenshot();

    /**
     * Get html source and attach it to the report
     */
    addAttachment("Page HTML source", `${browser.getPageSource()}`);
  }
};
