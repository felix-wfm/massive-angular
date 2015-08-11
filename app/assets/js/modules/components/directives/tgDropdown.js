/*
 ** Dependencies: tgWhenScrolled
 */

(function () {
    'use strict';

    angular.module('tg.components')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('tg-dropdown.tpl.html',
                '<div class="btn-group tg-dropdown-wrap" ng-class="tgDropdownWrapClass">' +

                '   <div class="tg-dropdown-button"' +
                '        ng-class="{ \'disabled\': tgDropdownDisabled }"' +
                '        ng-click="toggleOpenState($event);">' +
                '       <button class="tg-dropdown-label overflow">' +
                '           <span style="font-style: italic" class="muted"' +
                '                 ng-if="!$selectedItem"' +
                '                 ng-bind-html="tgDropdownPlaceholder"></span>' +
                '           <span tg-component-render-template="$templates.main.selectedItem">No Template</span>' +
                '       </button>' +
                '       <div class="input-loader tg-dropdown__loader" ng-show="$stateHolder.loader"></div>' +
                '       <button class="tg-dropdown-caret fa" ng-class="$stateHolder.popup.opened ? \'fa-caret-up\' : \'fa-caret-down\'"></button>' +
                '   </div>' +

                '   <div tg-component-render-template="$templates.popup.wrapper">' +
                '</div>'
            );

            $templateCache.put('tg-dropdown-popup.tpl.html',
                '<div class="tg-dropdown-menu"' +
                '     ng-class="{ \'tg-dropdown-menu-has-search\': !!tgDropdownSearch }"' +
                '     ng-style="$templates.popup.wrapper.style"' +
                '     ng-show="$stateHolder.popup.opened">' +
                '   <input type="text" class="tg-dropdown-menu-search" placeholder="{{ tgDropdownSearchPlaceholder }}" ' +
                '       ng-model="$stateHolder.filter" ' +
                '       ng-change="applyFilter();">' +
                '   <ul class="dropdown-menu" tg-when-scrolled="onPopupScrolled($event);">' +
                '       <li tg-component-render-template="$templates.popup.header"></li>' +
                '       <li ng-repeat="$item in $dataHolder.filteredItems | limitTo:$stateHolder.limit">' +
                '           <a href="" ng-click="selectItem($item);" tg-component-render-template="$templates.popup.item">' +
                '               No Template' +
                '           </a>' +
                '       </li>' +
                '       <li tg-component-render-template="$templates.popup.footer"></li>' +
                '   </ul>' +
                '</div>'
            );

            $templateCache.put('tg-dropdown-popup-footer.tpl.html',
                '<span ng-if="$stateHolder.filter && $dataHolder.filteredItems == 0">' +
                '   <a href="" class="overflow">' +
                '       No match for "{{ $stateHolder.filter }}"' +
                '   </a>' +
                '</span>');

            $templateCache.put('tg-dropdown-stage-popup.tpl.html',
                '<div class="tg-dropdown-menu"' +
                '     ng-style="$templates.popup.wrapper.style"' +
                '     ng-show="$stateHolder.popup.opened">' +
                '   <ul class="tg-dropdown-stage-menu">' +
                '       <li class="tg-dropdown-stage-menu__item-wrap" ng-if="$level > 0">' +
                '           <button class="fa fa-caret-left tg-dropdown-stage-menu__back" ng-click="goBack($item)"></button>' +
                '           <div class="tg-dropdown-stage-menu__item" ng-click="goBack($item);">Back</div>' +
                '       </li>' +
                '       <li class="tg-dropdown-stage-menu__item-wrap" ng-repeat="$item in $dataHolder.filteredItems">' +
                '           <div class="fa fa-check tg-dropdown-stage-menu__check" style="visibility: hidden;"></div>' +
                '           <button class="fa fa-caret-right tg-dropdown-stage-menu__forward"' +
                '                   ng-click="goForward($item);"' +
                '                   ng-if="hasChilds($item)"></button>' +
                '           <div class="tg-dropdown-stage-menu__item"' +
                '                ng-click="goForward($item);"' +
                '                ng-class="{ \'m-selectable\': !hasChilds($item) }"' +
                '                tg-component-render-template="$templates.popup.item">No Template</div>' +
                '       </li>' +
                '   </ul>' +
                '</div>'
            );
        }])
        .directive('tgDropdown', tgDropdown)
        .directive('tgDropdownStage', tgDropdownStage)
        .directive('tgDropdownSelectedItemTemplate', tgDropdownSelectedItemTemplate)
        .directive('tgDropdownPopupHeaderTemplate', tgDropdownPopupHeaderTemplate)
        .directive('tgDropdownItemTemplate', tgDropdownItemTemplate)
        .directive('tgDropdownPopupFooterTemplate', tgDropdownPopupFooterTemplate);

    /*
     * DROP-DOWN
     */
    tgDropdown.$inject = ['$tgComponents', '$injector', '$compile', '$parse', '$q', '$filter', '$timeout', '$interval', '$document'];

    function tgDropdown($tgComponents, $injector, $compile, $parse, $q, $filter, $timeout, $interval, $document) {
        return {
            restrict: 'A',
            require: ['tgDropdown', '?ngModel'],
            scope: {
                tgDropdown: '@',
                tgDropdownPlaceholder: '@',
                tgDropdownId: '@',
                tgDropdownWrapClass: '@',
                tgDropdownPopupAppendTo: '@',
                tgDropdownPopupAppendToBody: '@',
                tgDropdownPopupStrictWidth: '@',
                tgDropdownSearch: '=',
                tgDropdownSearchPlaceholder: '@',
                tgDropdownFilterBy: '@',
                tgDropdownOrderBy: '=',
                tgDropdownLimitStep: '@',
                tgDropdownSelected: '@',
                tgDropdownDisabled: '=',
                tgDropdownAddEmpty: '@',
                tgDropdownEmptyText: '@',
                tgDropdownSourceOnDemand: '@',
                tgDropdownComparator: '&'
            },
            compile: function (el, attrs) {
                var DROPDOWN_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

                function sourceExprParse(expression) {
                    var match = expression.match(DROPDOWN_REGEXP);

                    if (!match) {
                        throw new Error('Expected dropdown specification in form of \'_modelValue_ (as _label_)? for _item_ in _collection_\' but got \'' + attrs.tgDropdown + '\'.');
                    }

                    return {
                        expression: expression,
                        itemName: match[3],
                        sourceMapper: $parse(match[4]),
                        viewMapper: $parse(match[2] || match[1]),
                        modelMapper: $parse(match[1])
                    };
                }

                function preLink(scope, element, attrs, controllers) {
                    var selfCtrl = controllers[0],
                        ngModelCtrl = controllers[1],
                        parentScope = scope.$parent,
                        mapper = sourceExprParse(attrs.tgDropdown),
                        source = null,
                        locals = {},
                        modelValue = null,
                        emptyItem = null,
                        filterBy = (scope.tgDropdownFilterBy) ? $parse(scope.tgDropdownFilterBy) : null,
                        limitStep = parseInt(scope.tgDropdownLimitStep) || 9999,
                        onSelected = (scope.tgDropdownSelected) ? $parse(scope.tgDropdownSelected) : angular.noop,
                        sourceOnDemand = (scope.tgDropdownSourceOnDemand === 'true'),
                        comparatorFn = function (objA, objB) {
                            return angular.equals(objA, objB);
                        },
                        RenderTemplateModel = $injector.get('tgComponentRenderTemplateModel');

                    var comparator = scope.tgDropdownComparator();

                    if (angular.isFunction(comparator)) {
                        comparatorFn = comparator;
                    }

                    if (scope.tgDropdownAddEmpty === 'true') {
                        emptyItem = createItem(scope.tgDropdownEmptyText || null, null);
                    }

                    scope.$external = parentScope;
                    scope.$templates = {
                        main: {
                            wrapper: new RenderTemplateModel('main.wrapper', attrs.tgDropdownTemplateUrl || 'tg-dropdown.tpl.html'),
                            selectedItem: new RenderTemplateModel('main.selectedItem', attrs.tgDropdownSelectedItemTemplateUrl)
                        },
                        popup: {
                            wrapper: new RenderTemplateModel('popup.wrapper', attrs.tgDropdownPopupTemplateUrl || 'tg-dropdown-popup.tpl.html'),
                            header: new RenderTemplateModel('popup.header', attrs.tgDropdownPopupHeaderTemplateUrl),
                            item: new RenderTemplateModel('popup.item', attrs.tgDropdownItemTemplateUrl),
                            footer: new RenderTemplateModel('popup.footer', attrs.tgDropdownPopupFooterTemplateUrl || 'tg-dropdown-popup-footer.tpl.html')
                        }
                    };
                    scope.$stateHolder = {
                        popup: {
                            opened: false,
                            updateIntervalID: undefined
                        },
                        limit: limitStep,
                        filter: '',
                        loader: false,
                        loadDefer: undefined
                    };
                    scope.$dataHolder = {
                        filteredItems: []
                    };
                    scope.$selectedItem = emptyItem;

                    if (scope.tgDropdownPopupAppendToBody === 'true') {
                        scope.$templates.popup.wrapper.appendTo = 'body';
                    } else if (angular.isString(scope.tgDropdownPopupAppendTo)) {
                        scope.$templates.popup.wrapper.appendTo = scope.tgDropdownPopupAppendTo;
                    }

                    if (scope.tgDropdownPopupStrictWidth !== 'false') {
                        scope.$templates.popup.wrapper.strictWidth = true;
                    }

                    scope.$findElementInTemplate = function (tpl, selector) {
                        if (tpl && tpl.element && selector) {
                            return tpl.element.find(selector);
                        }
                    };

                    scope.openPopup = function () {
                        var defer = scope.$stateHolder.loadDefer,
                            popupState = scope.$stateHolder.popup;

                        if (sourceOnDemand && !scope.getSource()) {
                            defer = scope.refreshSource();
                        }

                        if (!defer) {
                            defer = $q.when(true);
                        }

                        scope.$stateHolder.loader = true;
                        popupState.opened = undefined;

                        defer
                            .then(function () {
                                if (popupState.opened !== false) {
                                    scope.$stateHolder.filter = '';
                                    scope.$dataHolder.filteredItems = scope.getSource();

                                    if (!scope.$dataHolder.filteredItems ||
                                        scope.$dataHolder.filteredItems.length === 0) {
                                        return;
                                    }

                                    popupState.opened = true;
                                    scope.$stateHolder.limit = limitStep;

                                    scope.updatePopupElement(scope.$templates.popup.wrapper);

                                    if (scope.$templates.popup.wrapper.appendTo && !popupState.updateIntervalID) {
                                        popupState.updateIntervalID = $interval(function () {
                                            if (popupState.opened) {
                                                scope.updatePopupElement(scope.$templates.popup.wrapper);
                                            }
                                        }, 50);
                                    }
                                }
                            })
                            .finally(function () {
                                scope.$stateHolder.loader = false;
                            });
                    };

                    scope.closePopup = function () {
                        var popupState = scope.$stateHolder.popup;

                        popupState.opened = false;
                        scope.$stateHolder.limit = limitStep;

                        if (popupState.updateIntervalID) {
                            $interval.cancel(popupState.updateIntervalID);
                            popupState.updateIntervalID = undefined;
                        }
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
                            (!scope.$stateHolder.popup.opened) ? scope.openPopup() : scope.closePopup();
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
                        var result = mapper.sourceMapper(parentScope),
                            defer = $q.when(result || false);

                        scope.$stateHolder.loadDefer = defer;

                        return defer
                            .then(function (data) {
                                if (data) {
                                    if (data.length > 0 && scope.tgDropdownOrderBy) {
                                        data = $filter('orderBy')(data, scope.tgDropdownOrderBy);
                                    }

                                    if (emptyItem) {
                                        var hasEmptyItem = false;

                                        for (var key in data) {
                                            if (getItemModelValue(data[key]) === null) {
                                                hasEmptyItem = true;
                                                break;
                                            }
                                        }

                                        if (!hasEmptyItem) {
                                            data.unshift(angular.copy(emptyItem));
                                        }
                                    }

                                    source = data;
                                } else {
                                    source = [];
                                }

                                return source;
                            })
                            .catch(function () {
                                source = [];
                            })
                            .finally(function () {
                                scope.$stateHolder.loadDefer = undefined;
                            });
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

                    scope.updatePopupElement = function (popup) {
                        var style = popup.style || {};

                        if (popup.appendTo) {
                            var offset = element.offset(),
                                height = element.outerHeight(true);

                            style.position = 'absolute';
                            style.top = offset.top + height + 1;
                            style.left = offset.left;
                        }

                        if (popup.strictWidth) {
                            style.width = element.innerWidth();
                            style.boxSizing = 'border-box';
                        }

                        popup.style = style;
                    };

                    scope.updateSelectedItemFromModel = function (value, getItemModelValueFn) {
                        if (value === undefined && emptyItem !== null) {
                            value = null;
                        }

                        scope.$selectedItem = null;

                        if (value !== undefined) {
                            if (getItemModelValueFn(scope.$selectedItem) !== value) {
                                if (source) {
                                    for (var key in source) {
                                        if (comparatorFn(getItemModelValueFn(source[key]), value)) {
                                            scope.$selectedItem = source[key];
                                            break;
                                        }
                                    }
                                } else if (sourceOnDemand) {
                                    scope.$selectedItem = createItem(value);
                                }
                            }
                        }

                        return (scope.$selectedItem !== null) ? value : null;
                    };

                    if (!sourceOnDemand) {
                        scope.refreshSource()
                            .finally(function () {
                                if (ngModelCtrl) {
                                    ngModelCtrl.$formatters.push(function (value) {
                                        return scope.updateSelectedItemFromModel(value, getItemModelValue);
                                    });
                                    scope.updateSelectedItemFromModel(ngModelCtrl.$modelValue, getItemModelValue);
                                    //ngModelCtrl.$setViewValue(modelValue);
                                }
                            });
                    } else {
                        if (ngModelCtrl) {
                            ngModelCtrl.$formatters.push(function (value) {
                                return scope.updateSelectedItemFromModel(value, getItemModelValue);
                            });
                        }
                    }

                    function createItem(viewValue, modelValue) {
                        var item = {};

                        mapper.modelMapper.assign(item, modelValue);
                        mapper.viewMapper.assign(item, viewValue);

                        return item[mapper.itemName];
                    }

                    function getItemModelValue(item) {
                        locals[mapper.itemName] = item;
                        modelValue = mapper.modelMapper(parentScope, locals);

                        // reset locals
                        locals[mapper.itemName] = null;

                        return modelValue;
                    }
                }

                function postLink(scope, element, attrs, ngModelCtrl) {
                    element.append($compile('<div tg-component-render-template="$templates.main.wrapper"></div>')(scope));

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
                        angular.forEach(scope.$templates, function (tplType) {
                            if (tplType) {
                                angular.forEach(tplType, function (tpl) {
                                    if (tpl && tpl.appendTo) {
                                        if (tpl.element) {
                                            tpl.element.remove();
                                        }
                                    }
                                });
                            }
                        });

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
                    $scope.$templates.main.selectedItem.setTemplate(tpl);
                };

                this.$setPopupHeaderTemplate = function (tpl) {
                    $scope.$templates.popup.header.setTemplate(tpl);
                };

                this.$setItemTemplate = function (tpl) {
                    $scope.$templates.popup.item.setTemplate(tpl);
                };

                this.$setPopupFooterTemplate = function (tpl) {
                    $scope.$templates.popup.footer.setTemplate(tpl);
                };

                this.refreshSource = function () {
                    return $scope.refreshSource();
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

    /*
     * DROP-DOWN EXTENSIONS
     */
    tgDropdownStage.$inject = ['$injector'];

    function tgDropdownStage($injector) {
        return {
            restrict: 'A',
            require: 'tgDropdown',
            scope: false,
            compile: function (tElement, tAttrs) {
                function preLink(scope, element, attrs, tgDropdownCtrl) {
                    var RenderTemplateModel = $injector.get('tgComponentRenderTemplateModel'),
                        source;

                    scope = tgDropdownCtrl.$scope;

                    scope.$templates.popup.wrapper = new RenderTemplateModel('popup.wrapper', attrs.tgDropdownPopupTemplateUrl || 'tg-dropdown-stage-popup.tpl.html');

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
                            source = scope.$dataHolder.filteredItems = item.childs;
                        } else {
                            scope.$paths = scope.collectPaths(item);
                            this.$baseFn(item);
                        }
                    });

                    tgDropdownCtrl.$overrideFn('getSource', function (isBase) {
                        if (isBase) {
                            return this.$baseFn();
                        }

                        return source;
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

                                scope.$selectedItem = findItem(scope.getSource(true)) || null;

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
                        scope.$dataHolder.filteredItems = scope.getSource(true);
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

                        findItem(scope.getSource(true));

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

                        findItem(scope.getSource(true));

                        return level;
                    };

                    tgDropdownCtrl.getPaths = function () {
                        return scope.$paths;
                    };
                }

                return {
                    pre: preLink,
                    post: undefined
                };
            }
        };
    }

    /*
     * DROP-DOWN TEMPLATE PARTS
     */
    tgDropdownSelectedItemTemplate.$inject = ['tgComponentsTemplate'];

    function tgDropdownSelectedItemTemplate(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgDropdown', '$setSelectedItemTemplate');
    }

    tgDropdownPopupHeaderTemplate.$inject = ['tgComponentsTemplate'];

    function tgDropdownPopupHeaderTemplate(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgDropdown', '$setPopupHeaderTemplate');
    }

    tgDropdownItemTemplate.$inject = ['tgComponentsTemplate'];

    function tgDropdownItemTemplate(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgDropdown', '$setItemTemplate');
    }

    tgDropdownPopupFooterTemplate.$inject = ['tgComponentsTemplate'];

    function tgDropdownPopupFooterTemplate(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgDropdown', '$setPopupFooterTemplate');
    }
})();
