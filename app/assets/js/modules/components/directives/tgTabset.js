(function () {
    'use strict';

    angular.module('tg.components')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('tg-tabset.tmpl.html',
                '<div class="tabbable" \
                      ng-class="tgTabsetWrapClass">\
                   <ul class="nav nav-tabs">\
                       <li ng-repeat="$tab in $tabs" \
                           ng-show="$tab.visible" \
                           ng-class="{ \'active\': isActiveTab($tab), \'disabled\': $tab.disabled }">\
                           <a href="" ng-click="setActiveTab($tab);">\
                               <span tg-tabset-render-template="$tab.template.header">{{ $tab.title || \'&nbsp;\' }}</span>\
                           </a>\
                       </li>\
                   </ul>\
                   <div class="tab-content" ng-repeat="$tab in $tabs">\
                       <div class="tab-pane" \
                             data-ng-show="$tab.visible" \
                             data-ng-class="{ \'active\': isActiveTab($tab) }">\
                             <div class="loader" \
                                  data-ng-show="$tab.loader"></div>\
                             <div data-ng-show="!$tab.loader && !$tab.initiated">Seems like some dependencies load failed! Click <a href="" ng-click="$tab.reload();">Refresh</a></div>\
                             <div data-ng-show="!$tab.loader" \
                                  data-ng-if="$tab.initiated" \
                                  data-tg-tabset-render-template="$tab.template.content"></div>\
                        </div>\
                   </div>\
                </div>'
            );
        }])
        .directive('tgTabset', tgTabset)
        .directive('tgTab', tgTab)
        .directive('tgTabsetRenderTemplate', ['$http', '$compile', '$parse', '$templateCache',
            function ($http, $compile, $parse, $templateCache) {
                return {
                    restrict: 'A',
                    scope: false,
                    compile: function () {
                        function postLink(scope, element, attrs) {
                            var tpl = $parse(attrs.tgTabsetRenderTemplate)(scope);

                            if (tpl && angular.isObject(tpl)) {
                                if (tpl.templateUrl) {
                                    element.html(null);

                                    if (!tpl.renderScope) {
                                        tpl.renderScope = scope;
                                    }

                                    $http.get(tpl.templateUrl, {cache: $templateCache})
                                        .success(function (tplContent) {
                                            var compiled = $compile(tplContent.trim());

                                            element.append(compiled(tpl.renderScope));
                                        });
                                } else if (tpl.hasOwnProperty('$attachTo')) {
                                    element.html(null);

                                    tpl.renderScope = scope;

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
        ]);

    tgTabset.$inject = ['$tgComponents', '$http', '$compile', '$parse', '$templateCache', '$q'];

    function tgTabset($tgComponents, $http, $compile, $parse, $templateCache, $q) {
        return {
            restrict: 'A',
            require: ['tgTabset'],
            scope: {
                tgTabset: '=?',
                tgTabsetId: '@',
                tgTabsetTemplateUrl: '@',
                tgTabsetWrapClass: '@',
                tgTabsetActiveTab: '@',
                tgTabsetContext: '@'
            },
            compile: function () {
                function preLink(scope, element, attrs, controllers) {
                    var selfCtrl = controllers[0];

                    scope.$tabs = selfCtrl.$tabs;

                    scope.setActiveTab = function (tab, ignoreError) {
                        selfCtrl.setActiveTab(tab, ignoreError);
                    };

                    scope.isActiveTab = function (tab) {
                        return (tab && selfCtrl.getActiveTab() === tab);
                    };
                }

                function postLink(scope, element, attrs) {
                    var parentScope = scope.$parent,
                        tplUrl = $parse(scope.tgTabsetTemplateUrl)(parentScope) || 'tg-tabset.tmpl.html';

                    $http.get(tplUrl, {cache: $templateCache})
                        .success(function (tplContent) {
                            var compiled = $compile(tplContent.trim())(scope);

                            element.prepend(compiled);
                        });
                }

                return {
                    pre: preLink,
                    post: postLink
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

                    var self = this,
                        tabs = this.$tabs = [],
                        activeTab = null,
                        activeTabName = $scope.tgTabsetActiveTab;

                    this.context = $parse($scope.tgTabsetContext)($scope.$parent) || {};

                    this.getActiveTab = function () {
                        return activeTab;
                    };

                    this.setActiveTab = function (tab, ignoreError) {
                        var defer = $q.defer();

                        if (tab && tabs.indexOf(tab) !== -1) {
                            if ((tab !== activeTab || !tab.initiated) && !tab.disabled) {
                                tab.refreshContext(false);

                                var fSelect = function () {
                                    var evt = {
                                        tab: tab,
                                        activeTab: activeTab
                                    };

                                    self.trigger('$onTabSelecting', evt)
                                        .then(function () {
                                            tab.loader = true;

                                            resolveDependencies(tab)
                                                .then(function () {
                                                    tab.initiated = true;
                                                })
                                                .finally(function () {
                                                    tab.loader = false;
                                                });

                                            if (activeTab) {
                                                if (!activeTab.keepOnDeselect) {
                                                    // enforce the $destroy cycle
                                                    if (activeTab.$scope) {
                                                        activeTab.$scope.$destroy();
                                                    }

                                                    activeTab.initiated = false;
                                                }

                                                evt = {
                                                    tab: activeTab
                                                };

                                                self.trigger('$onTabDeselected', evt);
                                            }

                                            activeTab = tab;

                                            evt = {
                                                tab: activeTab
                                            };

                                            self.trigger('$onTabSelected', evt);

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

                                    self.trigger('$onTabDeselecting', evt)
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
                        } else if (!!ignoreError) {
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

                        self.trigger('$onTabAdding', evt)
                            .then(function () {
                                tabs.push(tab);

                                self.trigger('$onTabAdded', evt);

                                if (tab.name === activeTabName) {
                                    self.setActiveTab(tab);
                                }
                            });
                    };

                    this.removeTab = function (tab, forced) {
                        if (checkName(tab.name)) {
                            throw new Error('Tab with name `' + tab.name + '` doesn\'t exist in tabset.');
                        }

                        function fRemove() {
                            var idx = tabs.indexOf(tab);

                            if (idx > -1) {
                                tabs.splice(idx, 1);

                                if (!forced) {
                                    self.trigger('$onTabRemoved', evt);

                                    if (tab === self.getActiveTab()) {
                                        idx--;

                                        if (idx < 0) {
                                            idx = 0;
                                        }

                                        self.setActiveTab(self.getTabByIndex(idx, true), true);
                                    }
                                }
                            }
                        }

                        if (!forced) {
                            var evt = {
                                tab: tab
                            };

                            self.trigger('$onTabRemoving', evt)
                                .then(function () {
                                    fRemove();
                                });
                        } else {
                            fRemove();
                        }
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

                    this.displayNext = function (startIndex, endIndex) {
                        tabs.forEach(function (tab, index) {
                            tab.visible = (startIndex <= index && index <= endIndex);
                        });
                    };

                    $tgComponents.$addInstance(self);

                    $scope.$on('$destroy', function () {
                        $tgComponents.$removeInstance(self);
                    });

                    function checkName(name) {
                        for (var idx in tabs) {
                            if (tabs[idx].name === name) {
                                return false;
                            }
                        }

                        return true;
                    }

                    function resolveDependencies(tab) {
                        var defer = $q.defer();

                        if (tab.resolve) {
                            var promises = [],
                                resolve = tab.resolve($scope);

                            angular.forEach(resolve, function (resolve, key) {
                                var rs = $injector.invoke(resolve);
                                promises.push(rs);
                            });

                            $q.all(promises)
                                .then(defer.resolve, defer.reject);
                        } else {
                            defer.resolve();
                        }

                        return defer.promise;
                    }
                }
            ]
        };
    }

    tgTab.$inject = ['$parse', '$interpolate'];

    function tgTab($parse, $interpolate) {
        return {
            restrict: 'A',
            require: ['tgTab', '^tgTabset'],
            transclude: true,
            scope: {},
            compile: function (tElement, tAttrs) {
                function preLink(scope, element, attrs, controllers, $transcludeFn) {
                    var selfCtrl = controllers[0],
                        tgTabsetCtrl = controllers[1],
                        attachedToElm;

                    selfCtrl.template.content.$attachTo = function (elm, scp) {
                        var evt = {
                            tab: selfCtrl
                        };

                        tgTabsetCtrl.trigger('$onTabAttaching', evt)
                            .then(function () {
                                attachedToElm = elm;

                                var newScope = scp;

                                if (attrs.tgTabIsolated !== 'true') {
                                    newScope = scope.$parent.$new();
                                    newScope.$tab = selfCtrl;
                                }

                                newScope.$external = scope.$parent;
                                newScope.$tabset = tgTabsetCtrl;
                                selfCtrl.$scope = newScope;

                                if (selfCtrl.template.header) {
                                    var headerScope = selfCtrl.template.header.renderScope;

                                    if (headerScope) {
                                        headerScope.$tab = selfCtrl;
                                    }
                                }

                                $transcludeFn(newScope, function (contents) {
                                    elm.append(contents);
                                });

                                tgTabsetCtrl.trigger('$onTabAttached', evt);
                            });
                    };

                    selfCtrl.refresh = function () {
                        if (selfCtrl.initiated && attachedToElm) {
                            var evt = {
                                tab: selfCtrl
                            };

                            tgTabsetCtrl.trigger('$onTabRefreshing', evt)
                                .then(function () {
                                    selfCtrl.$scope.$destroy();
                                    attachedToElm.html(null);
                                    selfCtrl.template.content.$attachTo(attachedToElm);

                                    tgTabsetCtrl.trigger('$onTabRefreshed', evt);
                                });
                        }
                    };

                    selfCtrl.reload = function () {
                        tgTabsetCtrl.setActiveTab(selfCtrl);
                    };

                    selfCtrl.refreshContext();

                    tgTabsetCtrl.addTab(selfCtrl);

                    attrs.$observe('tgTabTitle', function (value) {
                        selfCtrl.title = value;
                    });

                    scope.$on('$destroy', function () {
                        tgTabsetCtrl.removeTab(selfCtrl, true);
                    });
                }

                function postLink(scope, element, attrs) {
                    // remove tab block definition from markup
                    element.remove();
                }

                return {
                    pre: preLink,
                    post: postLink
                };
            },
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                var parsedContext = $parse($attrs.tgTabContext);

                this.name = $interpolate($attrs.tgTab || ('tgTab_' + $scope.$id))($scope.$parent);
                this.title = $attrs.tgTabTitle || undefined;

                this.template = {
                    header: {
                        templateUrl: $attrs.tgTabTemplateUrl,
                        renderScope: $scope.$parent.$new()
                    },
                    content: {
                        renderScope: null
                    }
                };

                this.$scope = null;
                this.context = null;
                this.resolve = null;

                if ($attrs.tgTabResolve) {
                    this.resolve = $parse($attrs.tgTabResolve);
                }

                this.loader = false;
                this.visible = true;
                this.initiated = ($attrs.tgTabInitiated === 'true');
                this.disabled = ($attrs.tgTabDisabled === 'true');
                this.keepOnDeselect = ($attrs.tgTabKeepOnDeselect === 'true');

                this.show = function () {
                    this.visible = true;
                };

                this.hide = function () {
                    this.visible = false;
                };

                this.refreshContext = function (reInit) {
                    var context = parsedContext($scope.$parent) || {};

                    if (reInit === false) {
                        context = angular.extend(context, this.context);
                    }

                    this.context = context
                };
            }]
        };
    }
})();
