const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
exports.config = {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    sauceRegion: 'us',
    seleniumAddress: 'https://ondemand.saucelabs.com/wd/hub',
    specs: ['specs/*spec.js'],

    onPrepare: async () => {
        const caps = await browser.getCapabilities();
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true,
            }
        }));
        },
        framework: 'jasmine',
        multiCapabilities: [{
            browserName: 'chrome',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            chromeOptions : { 'w3c' : true },
            'sauce:options': {
                seleniumVersion: '3.141.59',
                name: 'chrome-protractor-test',
                build: 'Sample Protractor Tests'
            },
            shardTestFiles: true,
            maxInstances: 25
        },{
            browserName: 'firefox',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            'sauce:options': {
                seleniumVersion: '3.141.59',
                name: 'chrome-protractor-test',
                build: 'Sample Protractor Tests'
            },
            shardTestFiles: true,
            maxInstances: 25
    }],

    baseUrl: 'https://www.saucedemo.com',

    SELENIUM_PROMISE_MANAGER: false,

    onComplete: async () => {
        let printSessionId = async (jobName) => {
            let session = await browser.getSession();
            console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
            };
        printSessionId("Insert Job Name Here");
        //await browser.executeScript("sauce:job-result=" + (SpecReporter.valueOf().result());
    },
};