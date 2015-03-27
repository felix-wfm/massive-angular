angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            'use strict';

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: './view/home/index.html',
                    controller: 'HomeController',
                    resolve: {
                        data: ['$q', '$timeout', function ($q, $timeout) {
                            var defer = $q.defer();

                            $timeout(function () {
                                defer.resolve();
                            }, 3000);

                            return defer.promise;
                        }]
                    }
                })
                .state('extensions', {
                    url: '/extensions',
                    templateUrl: './view/extensions/index.html',
                    resolve: {
                        data: ['$q', '$timeout', function ($q, $timeout) {
                            var defer = $q.defer();

                            $timeout(function () {
                                defer.resolve();
                            }, 3000);

                            return defer.promise;
                        }]
                    }
                })
                .state('extensions.tgComponents', {
                    url: '/tgComponents',
                    templateUrl: './view/extensions/tgComponents.html',
                    controller: 'ComponentsController'
                })
                .state('extensions.tgComponents.tab1', {
                    url: '/tab1',
                    views: {
                        tab1: {
                            template: '<span>Tab 1</span>',
                            asyncResolve: {
                                data: ['$q', '$timeout', function ($q, $timeout) {
                                    var defer = $q.defer();

                                    $timeout(function () {
                                        defer.resolve();
                                    }, 3000);

                                    return defer.promise;
                                }]
                            }
                        }
                    }
                })
                .state('extensions.tgComponents.tab2', {
                    url: '/tab2',
                    views: {
                        tab2: {
                            template: '<span>Tab 2</span>'
                        }
                    }
                })
                .state('components', {
                    url: '/components',
                    templateUrl: './view/components/index.html'
                })
                .state('components.tgTypeahead', {
                    url: '/tgTypeahead',
                    templateUrl: './view/components/tgTypeahead.html',
                    controller: 'TypeaheadController'
                })
                .state('components.tgDropdown', {
                    url: '/tgDropdown',
                    templateUrl: './view/components/tgDropdown.html',
                    controller: 'DropdownController'
                })
                .state('components.tgTabset', {
                    url: '/tgTabset',
                    templateUrl: './view/components/tgTabset.html',
                    controller: 'TabsetController'
                });
        }
    ]);
