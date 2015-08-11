(function () {
    'use strict';

    angular.module('tg.common')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope'];

    function AppController($scope) {
        $scope.toJson = function (obj) {
            return angular.toJson(obj, true);
        };

        (function init() {

        })();
    }
})();
