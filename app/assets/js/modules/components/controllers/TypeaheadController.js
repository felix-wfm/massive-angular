angular.module('app')
    .controller('TypeaheadController', ['$scope', '$q', '$filter', '$timeout',
        function ($scope, $q, $filter, $timeout) {
            'use strict';

            $scope.results = [{
                name: 'Qwerty',
                code: '12345'
            }, {
                name: 'Asdfg',
                code: '56789'
            }];

            $scope.getResultsAsync = function (viewValue, context) {
                var defer = $q.defer();

                $timeout(function () {
                    var results = $filter('filter')($scope.results, { name: viewValue });

                    if (results.length === 0) {
                        context.dataSet.data.noResults = true;
                    }

                    defer.resolve(results);
                }, 2000);

                return defer.promise;
            };

            (function init() {

            })();
        }
    ]);
