# Sample project for 'wdio-allure-ts'
------------
[![Build Status](https://travis-ci.org/cloudinary/wdio-allure-ts-example.svg?branch=master)](https://travis-ci.org/cloudinary/wdio-allure-ts-example)

A sample project with a quick introduction to wdio-allure-ts framework and its usage on a real-world application.  
The project contains examples for the following:
* [Tests](https://github.com/cloudinary/wdio-allure-ts-example/tree/master/src/tests) for implementation.
* [Page Object Model](https://github.com/cloudinary/wdio-allure-ts-example/tree/master/src/pages).
* [Allure Reporter](http://allure.qatools.ru), integrated and [configured](https://github.com/cloudinary/wdio-allure-ts-example/blob/0edb5c064cee25ecd41cc85b41aa1cc7caca7ae0/wdio.conf.js#L159) for attaching screenshots, [browser logs](https://github.com/cloudinary/wdio-allure-ts-example/blob/0edb5c064cee25ecd41cc85b41aa1cc7caca7ae0/wdio.conf.js#L260), and [HTML source](https://github.com/cloudinary/wdio-allure-ts-example/blob/0edb5c064cee25ecd41cc85b41aa1cc7caca7ae0/wdio.conf.js#L268) on test failures.
* Configurations for [local](https://github.com/cloudinary/wdio-allure-ts-example/blob/master/wdio.dev.conf.js) and [CI execution](https://github.com/cloudinary/wdio-allure-ts-example/blob/master/wdio.ci.conf.js).
* [Selenium grid](https://github.com/angular/webdriver-manager) setup for test execution.

## Getting Started
Following those instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites

* [NodeJs](https://nodejs.org/en/ "NodeJs") runtime engine
* [Chrome](https://www.google.com/chrome/ "Chrome") a for tests execution and display allure reporter
* [Java](http://www.oracle.com/technetwork/java/index.html "Java") for selenium grid and report generation 

------------
**Install packages:**
> npm install


**Execute test suite:** *(npm test)
> npm run suite todoMvcTestSuite

**Execute single test:**
> npm run spec ./lib/tests/TodoAngularTest.js

**Show report:**
> npm run report


**Additional commands can be found in the package.json**
## Code Structure

### Tests
Test located under **/test** folder and file names ends with `Test.ts`
Suggestion: Use only 1 test, to keep it more readable and in case of failure we'll rerun only one test and not all tests in class(Mocha limitation)

##### Naming convention in tests:
Describe should hold name of the tests suite and it will be represented in report as one suite, and each test should hold file name of the test class
**Example** where `TodoAngularTest` is a suite name and test file name is `TodoAngularTest.ts`
 ```javascript
   describe('TodoAngularTest', () => {
        it('Check URL', () => {
            //some test implementation
        });
    });
```
### Pages
Page Object Model is used for tests and all page classes located under /pages folder. Each class represent an UI object/functionality.
For example: TodoAngularPage.ts holds main functionality of the page, while Button.ts class holds basic functionality of the button component

### Utils
TestHelperUtils with common describe method that suites all the tests.

### Report example
[Click](https://cloudinary.github.io/wdio-allure-ts-example/allure-report/index.html "Click")  for live report example

### Related project
[wdio-allure-ts](https://github.com/cloudinary/wdio-allure-ts)