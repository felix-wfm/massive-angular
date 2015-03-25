angular.module('app')
    .controller('ComponentsController', ['$scope', '$state',
        function ($scope, $state) {
            'use strict';

            $scope.goPath = function (path) {
                $state.go(path);
            };

            (function init() {

            })();
        }
    ]);
