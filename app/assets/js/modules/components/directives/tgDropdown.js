/*
 ** Dependencies: tgWhenScrolled
 */

(function () {
    'use strict';

    function templateTransclusion(require, templateSetter) {
        return {
            restrict: 'A',
            require: require,
            transclude: true,
            scope: false,
            compile: function () {
                function preLink(scope, element, attrs, ctrl, $transcludeFn) {
                    if (templateSetter && ctrl && ctrl.hasOwnProperty(templateSetter)) {
                        ctrl[templateSetter]({
                            $attachTo: function (elm, scp) {
                                $transcludeFn(scp, function (contents) {
                                    elm.append(contents);
                                });
                            }
                        });
                    }
                }

                function postLink(scope, element, attrs) {
                    element.remove();
                }

                return {
                    pre: preLink,
                    post: postLink
                };
            }
        };
    }

    angular.module('tg.components')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('tg-dropdown.tpl.html',
                '<div class="btn-group tg-dropdown-wrap" data-ng-class="tgDropdownWrapClass">' +

                '   <div class="tg-dropdown-button" data-ng-class="{ \'disabled\': tgDropdownDisabled }"' +
                '        data-ng-click="toggleOpenState($event);">' +
                '       <button class="tg-dropdown-label overflow">' +
                '           <span style="font-style: italic" class="muted" data-ng-if="!$selectedItem" data-ng-bind-html="tgDropdownPlaceholder"></span>' +
                '           <span data-tg-dropdown-render-template="$templates.selectedItem">No Template</span>' +
                '       </button>' +
                '       <button class="tg-dropdown-caret fa" data-ng-class="$stateHolder.opened ? \'fa-caret-up\' : \'fa-caret-down\'"></button>' +
                '   </div>' +

                '   <div data-tg-dropdown-render-template="$templates.popup">' +
                '</div>'
            );

            $templateCache.put('tg-dropdown-popup.tpl.html',
                '<div class="tg-dropdown-menu" data-ng-class="{ \'tg-dropdown-menu-has-search\': !!tgDropdownSearch }" data-ng-show="$stateHolder.opened">' +
                '   <input type="text" class="tg-dropdown-menu-search" placeholder="{{ tgDropdownSearchPlaceholder }}" ' +
                '       data-ng-model="$stateHolder.filter" ' +
                '       data-ng-change="applyFilter();">' +
                '   <ul class="dropdown-menu" data-tg-when-scrolled="onPopupScrolled($event);">' +
                '       <li data-ng-if="$templates.itemHeader">' +
                '           <div data-tg-dropdown-render-template="$templates.itemHeader">' +
                '               No Template' +
                '           </div>' +
                '       </li>' +
                '       <li data-ng-repeat="$item in $dataHolder.filteredItems | limitTo:$stateHolder.limit">' +
                '           <a href="" data-ng-click="selectItem($item);" data-tg-dropdown-render-template="$templates.item">' +
                '               No Template' +
                '           </a>' +
                '       </li>' +
                '       <li data-ng-if="$stateHolder.filter && $dataHolder.filteredItems == 0">' +
                '           <a href="" class="overflow">' +
                '               No match for "{{ $stateHolder.filter }}"' +
                '           </a>' +
                '       </li>' +
                '   </ul>' +
                '</div>'
            );

            $templateCache.put('tg-dropdown-stage-popup.tpl.html',
                '<div class="tg-dropdown-menu" data-ng-show="$stateHolder.opened">' +
                '   <ul class="tg-dropdown-stage-menu">' +
                '       <li class="tg-dropdown-stage-menu__item-wrap" data-ng-if="$level > 0">' +
                '           <button class="fa fa-caret-left tg-dropdown-stage-menu__back" data-ng-click="goBack($item)"></button>' +
                '           <div class="tg-dropdown-stage-menu__item" data-ng-click="goBack($item);">Back</div>' +
                '       </li>' +
                '       <li class="tg-dropdown-stage-menu__item-wrap" data-ng-repeat="$item in $dataHolder.filteredItems">' +
                '           <div class="fa fa-check tg-dropdown-stage-menu__check" style="visibility: hidden;"></div>' +
                '           <button class="fa fa-caret-right tg-dropdown-stage-menu__forward" data-ng-click="goForward($item)" data-ng-if="hasChilds($item)"></button>' +
                '           <div class="tg-dropdown-stage-menu__item" data-ng-click="goForward($item);" data-tg-dropdown-render-template="$templates.item" data-ng-class="{ \'m-selectable\': !hasChilds($item) }">No Template</div>' +
                '       </li>' +
                '   </ul>' +
                '</div>'
            );
        }])
        .directive('tgDropdown', ['$tgComponents', '$http', '$compile', '$parse', '$templateCache', '$filter', '$timeout', '$document',
            function ($tgComponents, $http, $compile, $parse, $templateCache, $filter, $timeout, $document) {
                return {
                    restrict: 'A',
                    require: ['tgDropdown', '?ngModel'],
                    scope: {
                        tgDropdown: '@',
                        tgDropdownPlaceholder: '@',
                        tgDropdownId: '@',
                        tgDropdownWrapClass: '@',
                        tgDropdownTemplateUrl: '@',
                        tgDropdownPopupTemplateUrl: '@',
                        tgDropdownSearch: '=',
                        tgDropdownSearchPlaceholder: '@',
                        tgDropdownFilterBy: '@',
                        tgDropdownOrderBy: '=',
                        tgDropdownLimitStep: '@',
                        tgDropdownSelected: '@',
                        tgDropdownDisabled: '=',
                        tgDropdownAddEmpty: '@',
                        tgDropdownEmptyText: '@'
                    },
                    compile: function (el, attrs) {
                        var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/,
                            match = attrs.tgDropdown.match(TYPEAHEAD_REGEXP);

                        if (!match) {
                            throw new Error('Expected typeahead specification in form of \'_modelValue_ (as _label_)? for _item_ in _collection_\' but got \'' + attrs.tgDropdown + '\'.');
                        }

                        var mapper = {
                            itemName: match[3],
                            source: $parse(match[4]),
                            viewMapper: $parse(match[2] || match[1]),
                            modelMapper: $parse(match[1])
                        };

                        function createItem(viewValue, modelValue) {
                            var item = {};

                            mapper.modelMapper.assign(item, modelValue);
                            mapper.viewMapper.assign(item, viewValue);

                            return item[mapper.itemName];
                        }

                        function preLink(scope, element, attrs, controllers) {
                            var selfCtrl = controllers[0],
                                ngModelCtrl = controllers[1],
                                parentScope = scope.$parent,
                                source = null,
                                locals = {},
                                modelValue = null,
                                emptyItem = null,
                                filterBy = (scope.tgDropdownFilterBy) ? $parse(scope.tgDropdownFilterBy) : null,
                                limitStep = parseInt(scope.tgDropdownLimitStep) || 9999,
                                onSelected = (scope.tgDropdownSelected) ? $parse(scope.tgDropdownSelected) : angular.noop;

                            if (scope.tgDropdownAddEmpty === 'true') {
                                emptyItem = createItem(scope.tgDropdownEmptyText || null, null);
                            }

                            scope.$external = parentScope;
                            scope.$templates = {
                                main: scope.tgDropdownTemplateUrl || 'tg-dropdown.tpl.html',
                                popup: scope.tgDropdownPopupTemplateUrl || 'tg-dropdown-popup.tpl.html',
                                selectedItem: null,
                                itemHeader: null,
                                item: null
                            };
                            scope.$stateHolder = {
                                opened: false,
                                limit: limitStep,
                                filter: ''
                            };
                            scope.$dataHolder = {
                                filteredItems: []
                            };
                            scope.$selectedItem = emptyItem;

                            scope.openPopup = function () {
                                scope.$stateHolder.filter = '';
                                scope.$dataHolder.filteredItems = scope.getSource();

                                if (!scope.$dataHolder.filteredItems ||
                                    scope.$dataHolder.filteredItems.length === 0) {
                                    return;
                                }

                                scope.$stateHolder.opened = true;
                                scope.$stateHolder.limit = limitStep;

                                $timeout(function () {
                                    scope.updateMenu();
                                });
                            };

                            scope.closePopup = function () {
                                scope.$stateHolder.opened = false;
                                scope.$stateHolder.limit = limitStep;
                            };

                            scope.onPopupScrolled = function () {
                                var limit = scope.$stateHolder.limit + limitStep;

                                if (limit > scope.$dataHolder.filteredItems.length) {
                                    limit = scope.$dataHolder.filteredItems.length;
                                }

                                if (limit < limitStep) {
                                    limit = limitStep;
                                }

                                scope.$stateHolder.limit = limit;
                            };

                            scope.toggleOpenState = function ($event) {
                                if (!scope.tgDropdownDisabled) {
                                    (!scope.$stateHolder.opened) ? scope.openPopup() : scope.closePopup();
                                }

                                $event.preventDefault();
                            };

                            scope.getSource = function () {
                                return source;
                            };

                            scope.applyFilter = function () {
                                scope.$stateHolder.limit = limitStep;
                                scope.$dataHolder.filteredItems = $filter('filter')(source, filterBy({
                                    $filter: scope.$stateHolder.filter
                                }));
                            };

                            scope.refreshSource = function () {
                                source = mapper.source(parentScope);

                                if (source) {
                                    if (source && source.length > 0 && scope.tgDropdownOrderBy) {
                                        source = $filter('orderBy')(source, scope.tgDropdownOrderBy);
                                    }

                                    if (emptyItem) {
                                        var hasEmptyItem = false;

                                        for (var key in source) {
                                            if (getItemModelValue(source[key]) === null) {
                                                hasEmptyItem = true;
                                                break;
                                            }
                                        }

                                        if (!hasEmptyItem) {
                                            source.unshift(angular.copy(emptyItem));
                                        }
                                    }
                                }
                            };

                            scope.selectItem = function (item) {
                                var evt = scope.selectItemEventPrepare(item);

                                selfCtrl.trigger('onItemSelecting', evt)
                                    .then(function () {
                                        scope.closePopup();

                                        if (item) {
                                            scope.hasSelectedAnyItem = true;
                                        }

                                        scope.$selectedItem = item;

                                        if (ngModelCtrl) {
                                            modelValue = getItemModelValue(item);
                                            ngModelCtrl.$setViewValue(modelValue);
                                        }

                                        selfCtrl.trigger('onItemSelected', evt);
                                        onSelected(parentScope, evt);
                                    });
                            };

                            scope.selectItemEventPrepare = function (item) {
                                var evt = {
                                    $item: item
                                };

                                return evt;
                            };

                            scope.updateMenu = function () {
                                var ddm = element.find('.dropdown-menu');

                                if (ddm.length > 0) {
                                    var menu = element.find('.tg-dropdown-menu');
                                    menu.css('width', ddm.get(0).offsetWidth);
                                    ddm.scrollTop(0);

                                    if (!!scope.tgDropdownSearch) {
                                        menu.find('input.tg-dropdown-menu-search').focus();
                                    }
                                }
                            };

                            scope.updateSelectedItemFromModel = function (value, getItemModelValueFn) {
                                if (value === undefined && emptyItem !== null) {
                                    value = null;
                                }

                                scope.$selectedItem = null;

                                if (value !== undefined) {
                                    if (getItemModelValueFn(scope.$selectedItem) !== value) {
                                        for (var key in source) {
                                            if (angular.equals(getItemModelValueFn(source[key]), value)) {
                                                scope.$selectedItem = source[key];
                                                break;
                                            }
                                        }
                                    }
                                }

                                return (scope.$selectedItem !== null) ? value : null;
                            };

                            if (ngModelCtrl) {
                                ngModelCtrl.$formatters.push(function (value) {
                                    return scope.updateSelectedItemFromModel(value, getItemModelValue);
                                });
                            }

                            scope.refreshSource();

                            function getItemModelValue(item) {
                                locals[mapper.itemName] = item;
                                modelValue = mapper.modelMapper(parentScope, locals);

                                // reset locals
                                locals[mapper.itemName] = null;

                                return modelValue;
                            }
                        }

                        function postLink(scope, element, attrs, ngModelCtrl) {
                            $http.get(scope.$templates.main, {cache: $templateCache})
                                .success(function (tplContent) {
                                    element.append($compile(tplContent.trim())(scope));
                                });

                            var clickedOnElement = false,
                                onDocumentClick = function () {
                                    if (!clickedOnElement) {
                                        $timeout(function () {
                                            scope.closePopup();
                                        });
                                    }
                                    clickedOnElement = false;
                                };

                            $document.on('click', onDocumentClick);

                            element.on('click', function () {
                                clickedOnElement = true;
                            });

                            scope.$on('$destroy', function () {
                                $document.off('click', onDocumentClick);
                            });
                        }

                        return {
                            pre: preLink,
                            post: postLink
                        };
                    },
                    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                        var self = this;

                        self.$type = 'tgDropdown';
                        self.$name = !$scope.tgDropdownId ? (self.$type + '_' + $scope.$id) : $scope.tgDropdownId;
                        self.$scope = $scope;
                        self.$element = $element;
                        self.$attrs = $attrs;
                        self.$supportEvents = true;

                        this.$setSelectedItemTemplate = function (tpl) {
                            $scope.$templates.selectedItem = tpl;
                        };

                        this.$setItemHeaderTemplate = function (tpl) {
                            $scope.$templates.itemHeader = tpl;
                        };

                        this.$setItemTemplate = function (tpl) {
                            $scope.$templates.item = tpl;
                        };

                        this.refreshSource = function () {
                            $scope.refreshSource();
                        };

                        this.selectItem = function (item) {
                            $scope.selectItem(item);
                        };

                        this.$overrideFn = function (fnName, fn) {
                            var baseFn = $scope[fnName] || angular.noop;

                            $scope[fnName] = function overridenFunction() {
                                var tmpBase = this.$baseFn,
                                    ret;

                                this.$baseFn = baseFn;
                                ret = fn.apply(this, arguments);
                                this.$baseFn = tmpBase;

                                return ret;
                            };
                        };

                        $tgComponents.$addInstance(self);

                        $scope.$on('$destroy', function () {
                            $tgComponents.$removeInstance(self);
                        });
                    }]
                };
            }
        ])
        .directive('tgDropdownRenderTemplate', ['$http', '$compile', '$parse', '$templateCache',
            function ($http, $compile, $parse, $templateCache) {
                return {
                    restrict: 'A',
                    scope: false,
                    compile: function () {
                        function postLink(scope, element, attrs) {
                            var tpl = $parse(attrs.tgDropdownRenderTemplate)(scope);

                            if (angular.isString(tpl)) {
                                element.html(null);

                                $http.get(tpl, {cache: $templateCache})
                                    .success(function (tplContent) {
                                        element.append($compile(tplContent.trim())(scope));
                                    });
                            } else if (angular.isObject(tpl)) {
                                element.html(null);

                                tpl.$attachTo(element, scope);
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
        .directive('tgDropdownSelectedItemTemplate', [function () {
            return templateTransclusion('^?tgDropdown', '$setSelectedItemTemplate');
        }])
        .directive('tgDropdownItemHeaderTemplate', [function () {
            return templateTransclusion('^?tgDropdown', '$setItemHeaderTemplate');
        }])
        .directive('tgDropdownItemTemplate', [function () {
            return templateTransclusion('^?tgDropdown', '$setItemTemplate');
        }])
        .directive('tgDropdownStage', [function () {
            return {
                restrict: 'A',
                require: 'tgDropdown',
                scope: false,
                compile: function (el, attrs) {
                    function preLink(scope, element, attrs, tgDropdownCtrl) {
                        scope = tgDropdownCtrl.$scope;

                        scope.$templates.popup = scope.tgDropdownPopupTemplateUrl || 'tg-dropdown-stage-popup.tpl.html';
                        scope.$paths = [];
                        scope.$level = 0;

                        tgDropdownCtrl.$overrideFn('openPopup', function () {
                            this.$baseFn();

                            if (scope.$selectedItem) {
                                var paths = scope.collectPaths(scope.$selectedItem),
                                    idx = paths.length - 1;

                                if (idx >= 0) {
                                    scope.$level = idx + 1;
                                    scope.selectItem(paths[idx]);
                                } else {
                                    scope.goRoot();
                                }
                            } else {
                                scope.$level = 0;
                            }
                        });

                        tgDropdownCtrl.$overrideFn('selectItem', function (item) {
                            if (scope.hasChilds(item)) {
                                scope.$dataHolder.filteredItems = item.childs;
                            } else {
                                scope.$paths = scope.collectPaths(item);
                                this.$baseFn(item);
                            }
                        });

                        tgDropdownCtrl.$overrideFn('selectItemEventPrepare', function (item) {
                            var evt = this.$baseFn(item);

                            evt.$paths = scope.$paths;

                            return evt;
                        });

                        tgDropdownCtrl.$overrideFn('updateSelectedItemFromModel', function (value, getItemModelValueFn) {
                            if (value !== undefined) {
                                if (getItemModelValueFn(scope.$selectedItem) !== value) {
                                    var itm;

                                    var findItem = function (src) {
                                        if (Array.isArray(src)) {
                                            for (var i = 0, n = src.length; i < n; i++) {
                                                itm = src[i];

                                                if (getItemModelValueFn(itm) === value) {
                                                    return itm;
                                                }

                                                if (scope.hasChilds(itm)) {
                                                    itm = findItem(itm.childs);

                                                    if (itm) {
                                                        return itm;
                                                    }
                                                }
                                            }
                                        }
                                    };

                                    scope.$selectedItem = findItem(scope.getSource()) || null;

                                    if (scope.$selectedItem) {
                                        scope.$paths = scope.collectPaths(scope.$selectedItem);
                                    }
                                }
                            }

                            return (scope.$selectedItem !== null) ? value : null;
                        });

                        scope.hasChilds = function (item) {
                            return (item.hasOwnProperty('childs') &&
                            Array.isArray(item.childs) &&
                            item.childs.length > 0);
                        };

                        scope.goRoot = function () {
                            scope.$level = 0;
                            scope.$dataHolder.filteredItems = scope.getSource();
                        };

                        scope.goForward = function (item) {
                            scope.$level = scope.getItemLevel(item) + 1;

                            if (scope.$level >= 0) {
                                scope.selectItem(item);
                            } else {
                                scope.goRoot();
                            }
                        };

                        scope.goBack = function (item) {
                            var paths = scope.collectPaths(item),
                                idx = paths.length - 2;

                            if (idx >= 0) {
                                scope.$level = idx + 1;
                                scope.selectItem(paths[idx]);
                            } else {
                                scope.goRoot();
                            }
                        };

                        scope.collectPaths = function (item) {
                            var paths = [],
                                itm = null;

                            var findItem = function (src) {
                                var i, n;

                                if (Array.isArray(src)) {
                                    for (i = 0, n = src.length; i < n; i++) {
                                        itm = src[i];

                                        if (itm === item) {
                                            return itm;
                                        }

                                        if (scope.hasChilds(itm)) {
                                            itm = findItem(itm.childs);

                                            if (itm) {
                                                paths.unshift(src[i]);
                                                return itm;
                                            }
                                        }
                                    }
                                }
                            };

                            findItem(scope.getSource());

                            return paths;
                        };

                        scope.getItemLevel = function (item) {
                            var level = -1,
                                itm = null;

                            var findItem = function (src) {
                                if (Array.isArray(src)) {
                                    for (var i = 0, n = src.length; i < n; i++) {
                                        itm = src[i];

                                        if (itm === item) {
                                            level++;
                                            return itm;
                                        }

                                        if (scope.hasChilds(itm)) {
                                            itm = findItem(itm.childs);

                                            if (itm) {
                                                level++;
                                                return itm;
                                            }
                                        }
                                    }
                                }
                            };

                            findItem(scope.getSource());

                            return level;
                        };

                        tgDropdownCtrl.getPaths = function () {
                            return scope.$paths;
                        };
                    }

                    return {
                        pre: preLink,
                        post: null
                    };
                }
            };
        }]);
})();
