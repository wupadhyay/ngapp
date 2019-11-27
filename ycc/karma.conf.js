// Karma configuration
// Generated on Wed Jun 01 2016 17:37:40 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './src/main/webapp/scripts/external/jquery.min.js',
      './src/main/webapp/scripts/external/angular.js',
      './src/main/webapp/scripts/external/angular-lib/angulartics-ga.min.js',
      './src/main/webapp/scripts/external/angular-lib/analytics.js ',
      './src/main/webapp/scripts/external/angular-sanitize.js',
      './src/main/webapp/scripts/common.js',
      './src/main/webapp/scripts/external/angular-mocks.js',
      './src/main/webapp/scripts/external/angular-resource.min.js',
      './src/main/webapp/scripts/external/angular-animate.min.js',
      './src/main/webapp/scripts/external/ui-bootstrap-tpls.min.js',
      './src/main/webapp/scripts/external/angular-ui-router.min.js',
      './src/main/webapp/scripts/external/ng-table.min.js',
      './src/main/webapp/scripts/external/js/ng-infinite-scroll.js',
     './src/main/webapp/scripts/external/js/FileSaver.js',
      './src/main/webapp/scripts/external/angular-lib/ngStorage.min.js',
      './src/main/webapp/scripts/external/angular-lib/angular-filter.js',
      './src/main/webapp/scripts/external/select.min.js',
      './src/main/webapp/scripts/external/angular-lib/angular-aria.min.js',
      './src/main/webapp/scripts/external/angular-lib/mb-scrollbar.js',
      './src/main/webapp/modules/common/constants.js',
     './src/main/webapp/scripts/mock_service.js',
     './src/main/webapp/scripts/external/angular-lib/angular-material.min.js',
     './src/main/webapp/scripts/external/js/angular-base64-upload.js',
     './src/main/webapp/scripts/external/js/tinymce.min.js',
     './src/main/webapp/scripts/external/js/json-export-excel.js',
     './src/main/webapp/scripts/external/js/lazy-scroll.js',
     './src/main/webapp/scripts/app.js',
     './src/main/webapp/modules/controllers/controllers.js',
     './src/main/webapp/modules/services/services.js',
     './src/main/webapp/modules/services/aclService.js',
     './src/main/webapp/modules/services/appService.js',
      './src/main/webapp/modules/services/siteMetadataService.js',
     './src/main/webapp/modules/services/commonService.js',
     './src/main/webapp/modules/services/dashboardService.js',
     './src/main/webapp/modules/services/globalMessageService.js',
     './src/main/webapp/modules/services/localStorageService.js',
     './src/main/webapp/modules/services/pagerService.js',
      './src/main/webapp/modules/controllers/appController.js',
     './src/main/webapp/modules/controllers/dashboardController.js',
     './src/test/javascript/controllers/DashBoardTests.js',
     './src/test/javascript/controllers/ServiceSpecs.js',
     './src/test/javascript/controllers/AppControllerSpec.js',
     './src/test/javascript/controllers/dashboardRefined.js'
    
    

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.js': 'coverage'
      },
    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-html-reporter',
      'karma-junit-reporter',
      'karma-coverage'
  ],


    // // test results reporter to use
    // // possible values: 'dots', 'progress'
    // // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage','dots', 'junit'],

     coverageReporter: {
        dir: 'target/coverage/'
         },
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    browserNoActivityTimeout: 100000,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
