module.exports = function (config) {
    config.set({
        // testing framework to use
        frameworks: ['jasmine'],

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/highlightjs/highlight.pack.js',
            'bower_components/angular-highlightjs/angular-highlightjs.js',
            'app/config/config.*.js',
            'app/assets/js/**/*.js',
            'tests/helpers/*.js',
            'tests/setup/**/*.js',
            'tests/spec/**/*.js',
            {pattern: 'tests/data/**/*.json', watched: true, served: true, included: false}
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        browserNoActivityTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
