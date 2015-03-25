(function () {
    'use strict';

    angular.module('tg.common')
        .run(['$templateCache', '$rootScope', '$state', function ($templateCache, $rootScope, $state) {
            $templateCache.put('ui-viewport.tpl.html',
                '<i class="fa fa-spinner fa-spin fa-3x" ng-show="$inTransition"></i><div ui-view="{{ $viewName }}" ng-hide="$inTransition"></div>');

            $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
                $rootScope.$$uiRouterTransition = {
                    from: {
                        state: fromState,
                        params: fromParams
                    },
                    to: {
                        state: toState,
                        params: toParams
                    }
                };

                console.log('$stateChangeStart', $rootScope.$$uiRouterTransition);
            });

            $rootScope.$on('$stateChangeSuccess', function () {
                $rootScope.$$uiRouterTransition = undefined;

                console.log('$stateChangeSuccess');
            });

            $rootScope.$on('$stateChangeError', function () {
                $rootScope.$$uiRouterTransition = undefined;

                console.log('$stateChangeError');
            });
        }])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.decorator('views', function (state, getViews) {
                var views = getViews(state);

                state.self.$$views = [];

                for (var name in views) {
                    if (views.hasOwnProperty(name)) {
                        state.self.$$views.push(name);
                    }
                }

                return views;
            });
        }])
        .directive('uiViewport', ['$rootScope', '$interpolate', '$state', function ($rootScope, $interpolate, $state) {
            return {
                restrict: 'A',
                templateUrl: 'ui-viewport.tpl.html',
                scope: true,
                compile: function () {
                    function getUiViewName(scope, attrs, element) {
                        var name = $interpolate(attrs.uiViewport || attrs.name || '')(scope),
                            inherited = element.inheritedData('$uiView');

                        return (name.indexOf('@') >= 0) ? name : (name + '@' + (inherited ? inherited.state.name : ''));
                    }

                    function preLink(scope, element, attrs) {
                        var name = getUiViewName(scope, attrs, element);

                        scope.$viewName = attrs.uiViewport;

                        scope.$name = name;
                        scope.$inTransition = false;

                        var unwatchUiRouterTransition = $rootScope.$watch('$$uiRouterTransition', function (transition) {
                            if (transition) {
                                var toState = transition.to.state;

                                if (toState.$$views && toState.$$views.indexOf(name) !== -1) {
                                    scope.$inTransition = true;
                                    console.log('inTransition:on', name);
                                } else {
                                    toState = toState.parent;

                                    if (!toState || (toState.$$views && toState.$$views.indexOf(name) !== -1)) {
                                        scope.$inTransition = true;
                                        console.log('inTransition:on', name);
                                    }
                                }
                            } else {
                                scope.$inTransition = false;
                                console.log('inTransition:off', name);
                            }
                        });

                        scope.$on('$destroy', function () {
                            unwatchUiRouterTransition();
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
