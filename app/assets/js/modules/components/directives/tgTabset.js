(function () {
    'use strict';

    angular.module('tg.components')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('tg-tabset.tmpl.html',
                '<div class="tabbable" data-ng-class="tgTabsetWrapClass">' +
                '   <ul class="nav nav-tabs">' +
                '       <li data-ng-repeat="$tab in $tabs"' +
                '           data-ng-class="{ \'active\': isActiveTab($tab), \'disabled\': $tab.disabled }">' +
                '           <a href="" data-ng-click="setActiveTab($tab);">' +
                '               <span data-tg-tabset-render-template="$tab.template.header">{{ $tab.title || \'&nbsp;\' }}</span>' +
                '           </a>' +
                '       </li>' +
                '   </ul>' +
                '   <div class="tab-content" data-ng-repeat="$tab in $tabs">' +
                '       <div class="tab-pane"' +
                '            data-ng-if="$tab.initiated"' +
                '            data-tg-tabset-render-template="$tab.template.content"' +
                '            data-ng-class="{ \'active\': isActiveTab($tab) }"></div>' +
                '   </div>' +
                '</div>'
            );
        }])
        .directive('tgTabset', ['$tgComponents', '$http', '$compile', '$parse', '$templateCache', '$q',
            function ($tgComponents, $http, $compile, $parse, $templateCache, $q) {
                return {
                    restrict: 'A',
                    scope: {
                        tgTabset: '=?',
                        tgTabsetId: '@',
                        tgTabsetTemplateUrl: '@',
                        tgTabsetWrapClass: '@',
                        tgTabsetActiveTab: '@',
                        tgTabsetContext: '@',
                        tgTabsetSelected: '@'
                    },
                    compile: function () {
                        return function postLink(scope, element) {
                            var parentScope = scope.$parent,
                                ctrl = scope.tgTabset;

                            scope.$tabs = ctrl.$tabs;

                            scope.setActiveTab = function (tab) {
                                ctrl.setActiveTab(tab);
                            };

                            scope.isActiveTab = function (tab) {
                                return (tab && ctrl.getActiveTab() === tab);
                            };

                            var tplUrl = $parse(scope.tgTabsetTemplateUrl)(parentScope) || 'tg-tabset.tmpl.html';

                            $http.get(tplUrl, {cache: $templateCache}).success(function (tplContent) {
                                var compiled = $compile(tplContent.trim())(scope);

                                element.prepend(compiled);
                            });
                        };
                    },
                    controller: ['$scope', '$element', '$attrs',
                        function ($scope, $element, $attrs) {
                            this.$type = 'tgTabset';
                            this.$name = !$scope.tgTabsetId ? (this.$type + '_' + $scope.$id) : $scope.tgTabsetId;
                            this.$scope = $scope;
                            this.$element = $element;
                            this.$attrs = $attrs;
                            this.$supportEvents = true;

                            var _this = this,
                                tabs = this.$tabs = [],
                                activeTab = null,
                                activeTabName = $scope.tgTabsetActiveTab;

                            $scope.tgTabset = _this;

                            this.context = $parse($scope.tgTabsetContext)($scope.$parent) || {};

                            this.getActiveTab = function () {
                                return activeTab;
                            };

                            this.setActiveTab = function (tab) {
                                var defer = $q.defer();

                                if (tab && tabs.indexOf(tab) !== -1) {
                                    if (tab !== activeTab && !tab.disabled) {
                                        tab.refreshContext(false);

                                        var fSelect = function () {
                                            var evt = {
                                                tab: tab,
                                                activeTab: activeTab
                                            };

                                            _this.trigger('$onTabSelecting', evt)
                                                .then(function () {
                                                    tab.initiated = true;

                                                    if (tab.autoRefresh) {
                                                        tab.refresh();
                                                    }

                                                    if (activeTab) {
                                                        evt = {
                                                            tab: activeTab
                                                        };

                                                        _this.trigger('$onTabDeselected', evt);
                                                    }

                                                    activeTab = tab;

                                                    evt = {
                                                        tab: activeTab
                                                    };

                                                    $parse($attrs.tgTabsetSelected)($scope.$parent, evt);

                                                    _this.trigger('$onTabSelected', evt);

                                                    defer.resolve();
                                                })
                                                .catch(function () {
                                                    defer.reject();
                                                });
                                        };

                                        if (activeTab) {
                                            var evt = {
                                                tab: activeTab
                                            };

                                            _this.trigger('$onTabDeselecting', evt)
                                                .then(function () {
                                                    fSelect();
                                                })
                                                .catch(function () {
                                                    defer.reject();
                                                });
                                        } else {
                                            fSelect();
                                        }
                                    } else {
                                        defer.reject();
                                    }
                                } else {
                                    defer.reject();

                                    throw new Error('Invalid tab.');
                                }

                                return defer.promise;
                            };

                            this.addTab = function (tab) {
                                if (!checkName(tab.name)) {
                                    throw new Error('Tab with name `' + tab.name + '` was already added to tabset.');
                                }

                                var evt = {
                                    tab: tab
                                };

                                _this.trigger('$onTabAdding', evt)
                                    .then(function () {
                                        tabs.push(tab);

                                        _this.trigger('$onTabAdded', evt);

                                        if (tab.name === activeTabName) {
                                            _this.setActiveTab(tab);
                                        }
                                    });
                            };

                            this.getTabByIndex = function (index, ignoreError) {
                                var len = tabs.length;

                                if (index >= 0 || index < len) {
                                    return tabs[index];
                                }

                                if (!!ignoreError) {
                                    throw new Error('Invalid tab index.');
                                }

                                return null;
                            };

                            this.getTabByName = function (name, ignoreError) {
                                for (var index in tabs) {
                                    if (tabs[index].name === name) {
                                        return tabs[index];
                                    }
                                }

                                if (!!ignoreError) {
                                    throw new Error('Invalid tab name.');
                                }

                                return null;
                            };

                            this.setDefaultTab = function (name) {
                                activeTabName = name;
                            };

                            $tgComponents.$addInstance(this);

                            $scope.$on('$destroy', function () {
                                $tgComponents.$removeInstance(_this);
                            });

                            function checkName(name) {
                                for (var idx in tabs) {
                                    if (tabs[idx].name === name) {
                                        return false;
                                    }
                                }

                                return true;
                            }
                        }
                    ]
                };
            }
        ])
        .directive('tgTabsetRenderTemplate', ['$http', '$compile', '$parse', '$templateCache',
            function ($http, $compile, $parse, $templateCache) {
                return {
                    restrict: 'A',
                    scope: false,
                    compile: function () {
                        function postLink(scope, element, attrs) {
                            var tpl = $parse(attrs.tgTabsetRenderTemplate)(scope);

                            if (tpl && angular.isObject(tpl)) {
                                if (tpl.hasOwnProperty('templateUrl')) {
                                    element.html(null);

                                    $http.get(tpl.templateUrl, {cache: $templateCache})
                                        .success(function (tplContent) {
                                            var compiled = $compile(tplContent.trim());

                                            element.append(compiled(tpl.scope));
                                        });
                                } else if (tpl.hasOwnProperty('$attachTo')) {
                                    element.html(null);

                                    tpl.$attachTo(element, scope, null);
                                }
                            }
                        }

                        return {
                            pre: null,
                            post: postLink
                        };
                    }
                };
            }
        ])
        .directive('tgTab', ['$parse',
            function ($parse) {
                return {
                    restrict: 'A',
                    require: '^tgTabset',
                    transclude: true,
                    scope: {
                        tgTab: '@',
                        tgTabTitle: '@',
                        tgTabContext: '@',
                        tgTabInitiated: '@',
                        tgTabDisabled: '@',
                        tgTabAutoRefresh: '@',
                        tgTabIsolated: '@',
                        tgTabTemplateUrl: '@'
                    },
                    compile: function () {
                        function preLink(scope, element, attrs, tgTabsetCtrl, $transcludeFn) {
                            var attachedToElm = null;

                            var tab = scope.$tab;

                            tab.template.content.$attachTo = function (elm, scp) {
                                var evt = {
                                    tab: tab
                                };

                                tgTabsetCtrl.trigger('$onTabAttaching', evt)
                                    .then(function () {
                                        attachedToElm = elm;

                                        var newScope = (scope.tgTabIsolated === 'true') ? scp : scope.$parent.$new();

                                        newScope.$external = scope.$parent;
                                        newScope.$tabset = tgTabsetCtrl;
                                        newScope.$tab = tab;

                                        $transcludeFn(newScope, function (contents) {
                                            elm.append(contents);
                                        });

                                        tgTabsetCtrl.trigger('$onTabAttached', evt);
                                    });
                            };

                            tab.refresh = function () {
                                if (tab.initiated && attachedToElm) {
                                    var evt = {
                                        tab: tab
                                    };

                                    tgTabsetCtrl.trigger('$onTabRefreshing', evt)
                                        .then(function () {
                                            attachedToElm.html(null);
                                            tab.$attachTo(attachedToElm);

                                            tgTabsetCtrl.trigger('$onTabRefreshed', evt);
                                        });
                                }
                            };

                            tgTabsetCtrl.addTab(tab);

                            attrs.$observe('tgTabTitle', function (value) {
                                tab.title = value;
                            });

                            // remove tab block definition from markup
                            element.remove();
                        }

                        return {
                            pre: preLink,
                            post: null
                        };
                    },
                    controller: ['$scope', '$element', '$attrs',
                        function ($scope, $element, $attrs) {
                            var parsedContext = $parse($scope.tgTabContext);

                            $scope.$tab = {
                                name: $scope.tgTab,
                                title: $scope.tgTabTitle,
                                template: {
                                    header: ($scope.tgTabTemplateUrl) ? {
                                        templateUrl: $scope.tgTabTemplateUrl,
                                        scope: $scope.$parent
                                    } : null,
                                    content: {}
                                },
                                context: null,
                                initiated: ($scope.tgTabInitiated === 'true'),
                                disabled: ($scope.tgTabDisabled === 'true'),
                                autoRefresh: ($scope.tgTabAutoRefresh === 'true'),
                                refreshContext: function (reInit) {
                                    var context = parsedContext($scope.$parent) || {};

                                    if (reInit === false) {
                                        context = angular.extend(context, this.context);
                                    }

                                    this.context = context
                                }
                            };

                            $scope.$tab.refreshContext();
                        }
                    ]
                };
            }
        ]);
})();
