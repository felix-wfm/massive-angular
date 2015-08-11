(function (global) {
    'use strict';

    var $injector,
        $httpBackend;

    jasmine.getJSONFixtures().fixturesPath = 'base/tests/unit/data';

    global.specHelper = {
        getServiceReference: function (serviceName) {
            return $injector.get(serviceName);
        },

        setupModule: function (moduleName) {
            // mock Application to allow us to inject our own dependencies
            beforeEach(angular.mock.module(moduleName));

            injectServices.$inject = ['$injector', '$httpBackend'];

            function injectServices(injector, httpBackend) {
                $injector = injector;
                $httpBackend = httpBackend;
            }

            beforeEach(angular.mock.inject(injectServices));
        },

        setupBackendResponse: function (type, url, responseFile) {
            $httpBackend
                .when(type, url)
                .respond(getJSONFixture(responseFile));
        },

        setupNoOutstandingBackend: function () {
            afterEach(function () {
                // check that no outstanding $httpBackend expectations or requests
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.resetExpectations();
            });
        },

        flushHttpBackend: function (scope) {
            if (scope && scope.hasOwnProperty('$apply')) {
                scope.$apply();
            }

            $httpBackend.flush();
        }
    };
})(this);
