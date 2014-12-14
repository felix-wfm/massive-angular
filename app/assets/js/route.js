angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            'use strict';

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/view/home/index.html',
                    controller: 'HomeController'
                })
                .state('extensions', {
                    url: '/extensions',
                    templateUrl: '/view/extensions/index.html'
                })
                .state('extensions.tgComponents', {
                    url: '/tgComponents',
                    templateUrl: '/view/extensions/tgComponents.html',
                    controller: 'ComponentsController'
                })
                .state('components', {
                    url: '/components',
                    templateUrl: '/view/components/index.html'
                })
                .state('components.tgTypeahead', {
                    url: '/tgTypeahead',
                    templateUrl: '/view/components/tgTypeahead.html',
                    controller: 'TypeaheadController'
                })
                .state('components.tgDropdown', {
                    url: '/tgDropdown',
                    templateUrl: '/view/components/tgDropdown.html',
                    controller: 'DropdownController'
                })
                .state('components.tgTabset', {
                    url: '/tgTabset',
                    templateUrl: '/view/components/tgTabset.html',
                    controller: 'TabsetController'
                });
        }
    ]);
