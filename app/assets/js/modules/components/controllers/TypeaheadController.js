(function () {
    'use strict';

    angular.module('app')
        .controller('TypeaheadController', TypeaheadController);

    TypeaheadController.$inject = ['$scope', '$q', '$filter', '$timeout', 'DataService'];

    function TypeaheadController($scope, $q, $filter, $timeout, DataService) {
        $scope.__typeahead = {
            model1: null
        };

        $scope.control = {
            typeahead: {
                attributes: [{
                    name: 'tgTypeaheadId',
                    type: 'string',
                    description: ''
                }, {
                    name: 'tgTypeaheadContext',
                    type: 'expression',
                    description: ''
                }, {
                    name: 'tgTypeaheadPlaceholder',
                    type: 'string',
                    description: ''
                }, {
                    name: 'tgTypeaheadTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead template.'
                }, {
                    name: 'tgTypeaheadLoaderTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead loader template.'
                }, {
                    name: 'tgTypeaheadPopupTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead popup template.'
                }, {
                    name: 'tgTypeaheadPopupHeaderTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead popup header template.'
                }, {
                    name: 'tgTypeaheadPopupFooterTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead popup footer template.'
                }, {
                    name: 'tgTypeaheadDataSetsHeaderTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead data set header template.'
                }, {
                    name: 'tgTypeaheadDataSetsItemTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead data set item template.'
                }, {
                    name: 'tgTypeaheadDataSetsFooterTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead data set footer template.'
                }, {
                    name: 'tgTypeaheadSuggestedPopupTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead suggested popup template.'
                }, {
                    name: 'tgTypeaheadSuggestedPopupHeaderTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead suggested popup header template.'
                }, {
                    name: 'tgTypeaheadSuggestedPopupFooterTemplateUrl',
                    type: 'string',
                    description: 'Set custom typeahead suggested popup footer template.'
                }, {
                    name: 'tgTypeaheadPopupAppendToBody',
                    type: 'boolean',
                    description: 'Should the typeahead popup be appended to $body instead of the parent element? (default: false)'
                }, {
                    name: 'tgTypeaheadPopupStrictWidth',
                    type: 'boolean',
                    description: ''
                }, {
                    name: 'tgTypeaheadWrapClass',
                    type: 'string',
                    description: ''
                }, {
                    name: 'tgTypeaheadMinLength',
                    type: 'number',
                    description: 'The minimal number of characters that needs to be entered before the typeahead kicks in. The default value is set to 1. If set to 0, the typeahead will try to open on focus.'
                }, {
                    name: 'tgTypeaheadDelay',
                    type: 'number',
                    description: 'The minimum waiting time (after the last character was typed) before the typeahead kicks in.'
                }, {
                    name: 'tgTypeaheadSelected',
                    type: 'expression',
                    description: 'A callback executed when a match is selected.'
                }]
            }
        };

        $scope.getResultsAsync = function (viewValue, context) {
            var defer = $q.defer();

            $timeout(function () {
                DataService.getCountries()
                    .then(function (countries) {
                        countries = $filter('filter')(countries, {name: viewValue});

                        if (countries.length === 0) {
                            context.dataSet.data.noResults = true;
                        }

                        defer.resolve(countries);
                    });
            }, 2000);

            return defer.promise;
        };

        $scope.toJson = function (obj) {
            return angular.toJson(obj, true);
        };

        (function init() {

        })();
    }
})();
