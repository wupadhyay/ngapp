exports.config = {

    allScriptsTimeout: 50000,
    
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    //baseUrl: 'http://in-l1502:8080/ngycc/',
    onPrepare: function () {
        browser.driver.manage().window().maximize();
    },
    specs: [
         '../../e2e/spec/DashboardSpec.js','../../e2e/spec/SearchWidgetSpec.js','../../e2e/spec/SiteInformationSpec.js','../../e2e/spec/SiteDetailSpec.js'
        ],
    framework: 'jasmine',
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        isVerbose: true, //display spec names as they are being executed
        includeStackTrace: true, //print stack trace when things go wrong
        defaultTimeoutInterval: 30000,
        stopSpecOnExpectationFailure: true
        
    }

};

