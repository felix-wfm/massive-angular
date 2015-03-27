(function () {
    'use strict';

    angular.module('tg.common')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('ui-viewport.tpl.html',
                '<i class="fa fa-spinner fa-spin fa-3x" ng-show="$inTransition"></i><div ui-view="{{ $viewName }}" ng-hide="$inTransition"></div>');
        }])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.decorator('path', function (state, getPath) {
                var path = getPath(state);

                state.self.onEnter = function () {
                    //state.$inTransition = true;

                    //console.log(state);
                };

                return path;
            });
        }])
        .directive('uiViewport', ['$state', '$interpolate', function ($state, $interpolate) {
            return {
                restrict: 'A',
                templateUrl: 'ui-viewport.tpl.html',
                scope: true,
                compile: function () {
                    function preLink(scope, element, attrs) {
                        scope.$viewName = attrs.uiViewport || '';
                        scope.$inTransition = false;

                        function getUiViewName(scope, attrs, element, $interpolate) {
                            var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
                            var inherited = element.inheritedData('$uiView');
                            return name.indexOf('@') >= 0 ?  name :  (name + '@' + (inherited ? inherited.state.name : ''));
                        }

                        scope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
                            scope.$inTransition = true;

                            var current = $state.$current,
                                name = getUiViewName(scope, attrs, element, $interpolate),
                                locals  = current && current.locals[name];

                            console.log(name, locals);
                        });

                        scope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
                            /*if (scope.$viewName === '') {
                                if (!toState.hasOwnProperty('views') || toState.views.hasOwnProperty('@')) {

                                }
                            } else {
                                if (toState.hasOwnProperty('views') && toState.views.hasOwnProperty(scope.$viewName)) {

                                }
                            }

                            console.log(toState);*/
                        });

                        scope.$on('$viewContentLoaded', function () {
                            scope.$inTransition = false;
                        });

                        scope.$on('$destroy', function () {
                        });
                    }

                    return {
                        pre: preLink,
                        post: undefined
                    };
                }
            }
        }]);
})();
