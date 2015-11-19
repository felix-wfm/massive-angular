angular.module('app')
    .controller('FormController', ['$scope', '$timeout', '$q',
        function ($scope, $timeout, $q) {
            'use strict';

            $scope.equalTo = function (toField, value) {
                return toField === value;
            };

            $scope.someAsyncValidation = function (value) {
                var deferred = $q.defer();

                $timeout(function () {
                    var result = value === '123';

                    if (result) {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                    }
                }, 2 * 1000);

                return deferred.promise;
            };

            $scope.isDateValid = function (year, month, day) {
                month--;
                var date = new Date(year, month, day);

                return date.getDate() == day &&
                    date.getMonth() == month &&
                    date.getFullYear() == year;
            };

            $scope.isDateValidAsync = function (year, month, day) {
                var defer = $q.defer();

                $timeout(function () {
                    if ($scope.isDateValid(year, month, day)) {
                        defer.resolve();
                    } else {
                        defer.reject();
                    }
                }, 2 * 1000);

                return defer.promise;
            };

            (function init() {

            })();
        }
    ]);
