angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            'use strict';

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/view/home/index.html',
                    controller: 'HomeController'
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ]);
