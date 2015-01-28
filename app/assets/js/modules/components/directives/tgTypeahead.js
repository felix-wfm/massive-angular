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
                        ctrl[templateSetter]($transcludeFn);
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
            $templateCache.put('tg-typeahead.tpl.html',
                '<div class="tg-typeahead"' +
                '     ng-class="tgTypeaheadWrapClass">' +
                '   <div tg-typeahead-render-template="$templates.main.header"></div>' +
                '   <div tg-typeahead-render-template="$templates.main.container"></div>' +
                '   <div tg-typeahead-render-template="$templates.main.loader"></div>' +
                '   <div tg-typeahead-render-template="$templates.main.footer"></div>' +
                '   <div class="tg-typeahead__suggestions-wrap"' +
                '        tg-typeahead-render-template="$templates.popup.wrapper"></div>' +
                '   <div class="tg-typeahead__suggestions-wrap"' +
                '        ng-if="$stateHolder.hasSuggestions"' +
                '        tg-typeahead-render-template="$templates.suggestedPopup.wrapper"></div>' +
                '</div>');

            $templateCache.put('tg-typeahead-header.tpl.html',
                '<div class="tg-typeahead__header-wrap"></div>');

            $templateCache.put('tg-typeahead-container.tpl.html',
                '<div class="tg-typeahead__input-container"' +
                '     ng-show="$isVisibleInput()">' +
                '   <div class="tg-typeahead__input-wrap">' +
                '       <input type="text" class="tg-typeahead__input"' +
                '              placeholder="{{ $getPlaceholder() }}"' +
                '              ng-model="$term"' +
                '              ng-disabled="$stateHolder.disabled">' +
                '   </div>' +
                '</div>');

            $templateCache.put('tg-typeahead-footer.tpl.html',
                '<div class="tg-typeahead__footer-wrap">' +
                '   <a href="" class="tg-typeahead__clear-link"' +
                '      ng-show="!$stateHolder.loader && $isVisibleClear()"' +
                '      ng-click="$clear($event);">Remove All</a>' +
                '</div>');

            $templateCache.put('tg-typeahead-loader.tpl.html',
                '<div class="input-loader tg-typeahead__loader"' +
                '     ng-show="$stateHolder.loader"></div>');

            $templateCache.put('tg-typeahead-popup.tpl.html',
                '<ul class="tg-typeahead__suggestions"' +
                '    ng-if="$stateHolder.popup.opened"' +
                '    ng-style="$templates.popup.wrapper.style">' +
                '    <li class="tg-typeahead__suggestions-header"' +
                '        tg-typeahead-render-template="$templates.popup.header"></li>' +
                '    <li class="tg-typeahead__suggestions-container"' +
                '        tg-when-scrolled="$onPopupScrolled($event);">' +
                '        <div ng-repeat="$dataSet in $dataSets | filter:{ queried: { active: true } }">' +
                '            <div class="tg-typeahead__suggestions-group-header"' +
                '                 tg-typeahead-render-template="$dataSet.templates.header || $templates.dataSet.header"></div>' +
                '            <ul class="tg-typeahead__suggestions-group">' +
                '                <li class="tg-typeahead__suggestions-group-item"' +
                '                    ng-repeat="$match in $dataSet.queried.matches | limitTo:$dataSet.queried.limit"' +
                '                    ng-class="{ active: $index === $dataSet.queried.activeIndex, selected: $match.selected, disabled: $match.disabled }">' +
                '                    <div tg-typeahead-render-template="$dataSet.templates.item || $templates.dataSet.item"></div>' +
                '                </li>' +
                '            </ul>' +
                '            <div class="tg-typeahead__suggestions-group-footer"' +
                '                tg-typeahead-render-template="$dataSet.templates.footer || $templates.dataSet.footer"></div>' +
                '        </div>' +
                '    </li>' +
                '    <li class="tg-typeahead__suggestions-footer"' +
                '        tg-typeahead-render-template="$templates.popup.footer"></li>' +
                '</ul>');

            $templateCache.put('tg-typeahead-dataSet-item.tpl.html',
                '<span ng-bind-html="$match.value | tgTrustedHtml"></span>');

            $templateCache.put('tg-typeahead-suggested-popup.tpl.html',
                '<ul class="tg-typeahead__suggestions"' +
                '    ng-if="$stateHolder.suggestedPopup.opened"' +
                '    ng-style="$templates.suggestedPopup.wrapper.style">' +
                '    <li class="tg-typeahead__suggestions-header"' +
                '        tg-typeahead-render-template="$templates.suggestedPopup.header"></li>' +
                '    <li class="tg-typeahead__suggestions-container"' +
                '        tg-when-scrolled="$onPopupScrolled($event);">' +
                '        <div ng-repeat="$dataSet in $dataSets | filter:{ suggested: { active: true } }">' +
                '            <div class="tg-typeahead__suggestions-group-header"' +
                '                 tg-typeahead-render-template="$dataSet.templates.header || $templates.dataSet.header"></div>' +
                '            <ul class="tg-typeahead__suggestions-group">' +
                '                <li class="tg-typeahead__suggestions-group-item"' +
                '                    ng-repeat="$match in $dataSet.suggested.matches | limitTo:$dataSet.suggested.limit"' +
                '                    ng-class="{ active: $index === $dataSet.suggested.activeIndex, selected: $match.selected, disabled: $match.disabled }">' +
                '                    <div tg-typeahead-render-template="$dataSet.templates.item || $templates.dataSet.item"></div>' +
                '                </li>' +
                '            </ul>' +
                '            <div class="tg-typeahead__suggestions-group-footer"' +
                '                tg-typeahead-render-template="$dataSet.templates.footer || $templates.dataSet.footer"></div>' +
                '        </div>' +
                '    </li>' +
                '    <li class="tg-typeahead__suggestions-footer"' +
                '        tg-typeahead-render-template="$templates.suggestedPopup.footer"></li>' +
                '</ul>');

            $templateCache.put('tg-typeahead-suggested-dataSet-item.tpl.html',
                '<span ng-bind-html="$match.value | tgTrustedHtml"></span>');

            $templateCache.put('tg-typeahead-tag-manager.tpl.html',
                '<div class="tg-typeahead__tab-manager">' +
                '   <div ng-repeat="$tag in $tags | orderBy:$tagsOrder">' +
                '       <div tg-typeahead-render-template="$templates.tagManager.tag"></div>' +
                '   </div>' +
                '</div>');

            $templateCache.put('tg-typeahead-tag.tpl.html',
                '<div class="tg-typeahead__tag">' +
                '    <span class="tg-typeahead__tag-remove fa fa-times" rel="tooltip"' +
                '       tooltip-placement="right"' +
                '       tooltip-html-unsafe="delete"' +
                '       ng-click="$removeTag($tag)"></span>' +
                '    <span class="tg-typeahead__tag-name" ng-bind-html="$tag.match.value | tgTrustedHtml"></span>' +
                '</div>');
        }])
        .directive('tgTypeahead', ['$tgComponents', '$injector', '$http', '$compile', '$parse', '$q', '$timeout', '$document',
            function ($tgComponents, $injector, $http, $compile, $parse, $q, $timeout, $document) {
                return {
                    restrict: 'A',
                    require: ['tgTypeahead', '?ngModel'],
                    scope: {
                        tgTypeahead: '@',
                        tgTypeaheadId: '@',
                        tgTypeaheadContext: '=',
                        tgTypeaheadPlaceholder: '@',
                        tgTypeaheadPopupAppendToBody: '@',
                        tgTypeaheadPopupStrictWidth: '@',
                        tgTypeaheadWrapClass: '@',
                        tgTypeaheadDisplayClean: '@',
                        tgTypeaheadMinLength: '@',
                        tgTypeaheadDelay: '@',
                        tgTypeaheadSelected: '@'
                    },
                    priority: 4,
                    transclude: true,
                    template: '<div tg-typeahead-render-template="$templates.main.wrapper" ng-transclude=""></div>',
                    compile: function (tElement, tAttrs) {
                        var KEYBOARD_KEYS = [9, 13, 27, 32, 38, 40];

                        var $getModelValue = $parse(tAttrs.ngModel),
                            $setModelValue = $getModelValue.assign,
                            RenderTemplateModel = $injector.get('tgTypeaheadRenderTemplateModel'),
                            MatchModel = $injector.get('tgTypeaheadMatchModel'),
                            SuggestedMatchModel = $injector.get('tgTypeaheadSuggestedMatchModel');

                        function isPromise(ref) {
                            return (ref && ref.hasOwnProperty('then') && angular.isFunction(ref.then));
                        }

                        function preLink(scope, element, attrs, controllers) {
                            var parentScope = scope.$external = scope.$parent,
                                selfCtrl = controllers[0],
                                ngModelCtrl = controllers[1];

                            scope.selectedDataSet = null;
                            scope.$dataSets = [];
                            scope.$term = null;

                            /// - START UPDATE -
                            function $$renderCallback(tpl) {
                                selfCtrl.trigger('onTemplateInit', {template: tpl});

                                switch (tpl.name) {
                                    case 'main.container':
                                        $$renderMainContainer(tpl);
                                        break;
                                    case 'popup.wrapper':
                                    case 'suggestedPopup.wrapper':
                                        attachEventsToMatchedItems(tpl.element);
                                        break;
                                }
                            }

                            scope.$$getTypeaheadInputEl = function () {
                                var wrapperEl = scope.$templates.main.wrapper.element;

                                if (wrapperEl) {
                                    var inputEl = wrapperEl.find('.tg-typeahead__input');

                                    if (inputEl.length > 0) {
                                        return inputEl;
                                    }
                                }
                            };

                            var timeoutPromise,
                                minLength = Math.abs(parseInt(scope.tgTypeaheadMinLength) || 0),
                                delay = Math.abs(parseInt(scope.tgTypeaheadDelay) || 500);

                            function $$renderMainContainer(tpl) {
                                var inputEl = scope.$$getTypeaheadInputEl();

                                inputEl.on('click', function () {
                                    var isOpenedPopup = scope.$stateHolder.popup.opened;

                                    scope.$closePopup();

                                    if (scope.$stateHolder.hasSuggestions && !isOpenedPopup) {
                                        scope.$resolveSuggestedSources();
                                    }
                                });

                                var inputNgModelCtrl = inputEl.controller('ngModel');

                                inputNgModelCtrl.$parsers.unshift(function (val) {
                                    val = val || '';

                                    if (timeoutPromise) {
                                        $timeout.cancel(timeoutPromise);
                                    }

                                    scope.$closePopup();

                                    scope.$applyMatch(null, null);

                                    if (val.length >= minLength) {
                                        timeoutPromise = $timeout(function () {
                                            if (scope.$term) {
                                                scope.$resolveSources(val);
                                            }
                                        }, delay);
                                    }

                                    return val;
                                });
                            }

                            scope.updatePopupElement = function (popup) {
                                var style = popup.style || {};

                                if (popup.appendToBody) {
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

                            scope.$isFocusedInput = function () {
                                var inputEl = scope.$$getTypeaheadInputEl();

                                return (inputEl && inputEl.is(":focus"));
                            };
                            /// - END UPDATE -

                            scope.$templates = {
                                main: {
                                    wrapper: new RenderTemplateModel('main.wrapper', attrs.tgTypeaheadTemplateUrl || 'tg-typeahead.tpl.html', $$renderCallback),
                                    header: new RenderTemplateModel('main.header', attrs.tgTypeaheadHeaderTemplateUrl || 'tg-typeahead-header.tpl.html', $$renderCallback),
                                    container: new RenderTemplateModel('main.container', attrs.tgTypeaheadContainerTemplateUrl || 'tg-typeahead-container.tpl.html', $$renderCallback),
                                    footer: new RenderTemplateModel('main.footer', attrs.tgTypeaheadFooterTemplateUrl || 'tg-typeahead-footer.tpl.html', $$renderCallback),
                                    loader: new RenderTemplateModel('main.loader', attrs.tgTypeaheadLoaderTemplateUrl || 'tg-typeahead-loader.tpl.html', $$renderCallback)
                                },
                                popup: {
                                    wrapper: new RenderTemplateModel('popup.wrapper', attrs.tgTypeaheadPopupTemplateUrl || 'tg-typeahead-popup.tpl.html', $$renderCallback),
                                    header: new RenderTemplateModel('popup.header', attrs.tgTypeaheadPopupHeaderTemplateUrl, $$renderCallback),
                                    container: new RenderTemplateModel('popup.container', undefined, $$renderCallback),
                                    footer: new RenderTemplateModel('popup.footer', attrs.tgTypeaheadPopupFooterTemplateUrl, $$renderCallback)
                                },
                                suggestedPopup: {
                                    wrapper: new RenderTemplateModel('suggestedPopup.wrapper', attrs.tgTypeaheadSuggestedPopupTemplateUrl || 'tg-typeahead-suggested-popup.tpl.html', $$renderCallback),
                                    header: new RenderTemplateModel('suggestedPopup.header', attrs.tgTypeaheadSuggestedPopupHeaderTemplateUrl, $$renderCallback),
                                    container: new RenderTemplateModel('suggestedPopup.container', undefined, $$renderCallback),
                                    footer: new RenderTemplateModel('suggestedPopup.footer', attrs.tgTypeaheadSuggestedPopupFooterTemplateUrl, $$renderCallback)
                                },
                                dataSet: {
                                    header: new RenderTemplateModel('dataSet.header', attrs.tgTypeaheadDataSetsHeaderTemplateUrl, $$renderCallback),
                                    item: new RenderTemplateModel('dataSet.item', attrs.tgTypeaheadDataSetsItemTemplateUrl || 'tg-typeahead-dataSet-item.tpl.html', $$renderCallback),
                                    footer: new RenderTemplateModel('dataSet.footer', attrs.tgTypeaheadDataSetsFooterTemplateUrl, $$renderCallback)
                                }
                            };

                            if (scope.tgTypeaheadPopupAppendToBody === 'true') {
                                scope.$templates.popup.wrapper.appendToBody = true;
                                scope.$templates.suggestedPopup.wrapper.appendToBody = true;
                            }

                            if (scope.tgTypeaheadPopupStrictWidth !== 'false') {
                                scope.$templates.popup.wrapper.strictWidth = true;
                                scope.$templates.suggestedPopup.wrapper.strictWidth = true;
                            }

                            scope.$stateHolder = {
                                loader: false,
                                disabled: false,
                                popup: {
                                    opened: false
                                },
                                hasSuggestions: false,
                                suggestedPopup: {
                                    opened: false
                                }
                            };

                            scope.$dataHolder = {
                                collectedPromises: [],
                                modelValue: null
                            };

                            scope.$eventHolder = {
                                onMatchSelected: $parse(scope.tgTypeaheadSelected)
                            };

                            scope.$promisesHolder = {
                                regularCancelPromise: undefined,
                                suggestedCancelPromise: undefined
                            };

                            scope.getDataSetSource = function (dataSet) {
                                if (dataSet) {
                                    if (scope.$stateHolder.popup.opened) {
                                        return dataSet.queried;
                                    }

                                    if (scope.$stateHolder.suggestedPopup.opened) {
                                        return dataSet.suggested;
                                    }
                                }
                            };

                            scope.selectDataSet = function (dataSet, $event) {
                                var dataSetSource;

                                scope.$dataSets.forEach(function (_dataSet) {
                                    dataSetSource = scope.getDataSetSource(_dataSet);

                                    if (dataSetSource) {
                                        dataSetSource.$hideMore();
                                        dataSetSource.active = (!dataSet);
                                    }
                                });

                                scope.selectedDataSet = dataSet;

                                if (scope.selectedDataSet) {
                                    dataSetSource = scope.getDataSetSource(scope.selectedDataSet);

                                    if (dataSetSource) {
                                        dataSetSource.$showMore();
                                        dataSetSource.active = true;
                                    }
                                }

                                element.find('.tg-typeahead__suggestions-container').scrollTop();

                                if ($event) {
                                    $event.stopPropagation();
                                }
                            };

                            scope.$openPopup = function () {
                                if (!scope.$stateHolder.popup.opened) {
                                    scope.$stateHolder.popup.opened = true;

                                    scope.selectDataSet(null);
                                    scope.$setActiveMatch(null, -1);

                                    scope.updatePopupElement(scope.$templates.popup.wrapper);
                                }
                            };

                            scope.$openSuggestedPopup = function () {
                                if (!scope.$stateHolder.suggestedPopup.opened) {
                                    scope.$stateHolder.suggestedPopup.opened = true;

                                    scope.selectDataSet(null);
                                    scope.$setActiveMatch(null, -1);

                                    scope.updatePopupElement(scope.$templates.suggestedPopup.wrapper);
                                }
                            };

                            scope.$closePopup = function () {
                                if (scope.$stateHolder.popup.opened) {
                                    scope.$stateHolder.popup.opened = false;
                                }

                                if (scope.$stateHolder.suggestedPopup.opened) {
                                    scope.$stateHolder.suggestedPopup.opened = false;
                                }

                                scope.$cancelAllRequests();
                            };

                            scope.$isVisibleInput = function () {
                                return true;
                            };

                            scope.$getPlaceholder = function () {
                                return scope.tgTypeaheadPlaceholder || '';
                            };

                            scope.$isVisibleClear = function () {
                                return (scope.tgTypeaheadDisplayClean === 'true' && scope.$term);
                            };

                            scope.$clear = function ($event) {
                                scope.$clearTypeahead();
                            };

                            scope.$updateInputElement = function () {
                            };

                            scope.$prepareSourceContext = function () {
                            };

                            scope.$resolveSources = function (searchTerm) {
                                scope.$cancelAllRequests();

                                scope.$stateHolder.loader = true;
                                scope.$promisesHolder.regularCancelPromise = $q.defer();

                                $q.all(collectSources(searchTerm))
                                    .then(function () {
                                        if (scope.$dataHolder.collectedPromises.length > 0) {
                                            clearCollectedPromises();

                                            scope.$openPopup();
                                        }
                                    }, function () {
                                        scope.$cancelAllRequests();
                                    })
                                    .finally(function () {
                                        scope.$stateHolder.loader = false;
                                    });
                            };

                            scope.$resolveSuggestedSources = function () {
                                scope.$cancelAllRequests();

                                scope.$stateHolder.loader = true;
                                scope.$promisesHolder.suggestedCancelPromise = $q.defer();

                                $q.all(collectSuggestedSources())
                                    .then(function () {
                                        if (scope.$dataHolder.collectedPromises.length > 0) {
                                            clearCollectedPromises();

                                            $timeout(function () {
                                                scope.$openSuggestedPopup();
                                            });
                                        }
                                    }, function () {
                                        scope.$cancelAllRequests();
                                    })
                                    .finally(function () {
                                        scope.$stateHolder.loader = false;
                                    });
                            };

                            scope.$cancelAllRequests = function () {
                                scope.$stateHolder.loader = false;

                                var rcp = scope.$promisesHolder.regularCancelPromise,
                                    scp = scope.$promisesHolder.suggestedCancelPromise;

                                if (rcp) {
                                    rcp.reject();
                                    scope.$promisesHolder.regularCancelPromise = undefined;
                                }

                                if (scp) {
                                    scp.reject();
                                    scope.$promisesHolder.suggestedCancelPromise = undefined;
                                }

                                var collectedPromises = scope.$dataHolder.collectedPromises;

                                if (collectedPromises.length > 0) {
                                    collectedPromises.forEach(function (promise) {
                                        if (promise.hasOwnProperty('cancelRequest')) {
                                            promise.cancelRequest();
                                        }
                                    });

                                    clearCollectedPromises();
                                }
                            };

                            scope.$clearTypeahead = function () {
                                scope.$term = null;
                            };

                            scope.$setActiveMatch = function (dataSet, index) {
                                var dataSetSource;

                                scope.$dataSets.forEach(function (_dataSet) {
                                    dataSetSource = scope.getDataSetSource(_dataSet);

                                    if (dataSetSource) {
                                        dataSetSource.activeIndex = (_dataSet === dataSet) ? index : -1;
                                    }
                                });
                            };

                            scope.$selectMatch = function (dataSet, index, match, $event) {
                                var evt = {
                                    context: scope.tgTypeaheadContext,
                                    dataSet: dataSet,
                                    index: index,
                                    match: match
                                };

                                selfCtrl.trigger('onMatchSelecting', evt)
                                    .then(function () {
                                        scope.$term = evt.match.value;

                                        scope.$applyMatch(dataSet, evt.match.model);

                                        selfCtrl.trigger('onMatchSelected', evt);
                                        scope.$eventHolder.onMatchSelected(parentScope, evt);
                                    });

                                scope.$closePopup();
                            };

                            scope.$selectUnknownMatch = function (dataSet, match, $event) {
                                scope.$selectMatch(dataSet, -1, match, $event);
                            };

                            scope.$applyMatch = function (dataSet, model) {
                                var _model = model;

                                if (scope.$dataSets.length > 1) {
                                    _model = scope.$getModel() || {};

                                    scope.$dataSets.forEach(function (_dataSet) {
                                        _model[_dataSet.name] = (_dataSet === dataSet) ? model : null;
                                    });
                                }

                                scope.$setModel(_model);
                            };

                            scope.$prepareDefaultModel = function () {
                                var multiple = (scope.$dataSets.length > 1),
                                    model = null;

                                if (multiple) {
                                    model = {};

                                    scope.$dataSets.forEach(function (dataSet) {
                                        model[dataSet.name] = null;
                                    });
                                }

                                return model;
                            };

                            scope.$prepareModel = function (model) {
                                if (model === undefined) {
                                    return scope.$prepareDefaultModel();
                                }

                                var activeDataSet,
                                    single = (scope.$dataSets.length === 1),
                                    multiple = (scope.$dataSets.length > 1);

                                if (single) {
                                    activeDataSet = scope.$dataSets[0];
                                } else if (multiple) {
                                    if (!model || Array.isArray(model) || !angular.isObject(model)) {
                                        model = {};
                                    }

                                    scope.$dataSets.forEach(function (dataSet) {
                                        if (!model.hasOwnProperty(dataSet.name)) {
                                            model[dataSet.name] = null;
                                        }

                                        if (model[dataSet.name] !== null && model[dataSet.name] !== undefined) {
                                            activeDataSet = dataSet;
                                        }
                                    });
                                }

                                if (activeDataSet) {
                                    var match = (single) ? model : model[activeDataSet.name];

                                    scope.$term = activeDataSet.queried.$getItem(match, scope.$parent).value;
                                }

                                return model;
                            };

                            scope.$prepareMatchModel = function (matchModel, dataSet) {

                            };

                            scope.$getModel = function () {
                                if ($getModelValue) {
                                    return $getModelValue(parentScope);
                                }
                            };

                            scope.$setModel = function (model, ignoreDirty) {
                                scope.$dataHolder.modelValue = model;

                                if (!ignoreDirty && ngModelCtrl) {
                                    // make controller to be dirty
                                    ngModelCtrl.$setViewValue(null);
                                }

                                if ($setModelValue) {
                                    $setModelValue(parentScope, model);
                                }
                            };

                            scope.$waitTill = function (promise) {
                                if (promise && promise.hasOwnProperty('finally')) {
                                    scope.$closePopup();
                                    scope.$stateHolder.loader = true;
                                    scope.$stateHolder.disabled = true;

                                    promise
                                        .finally(function () {
                                            scope.$stateHolder.loader = false;
                                            scope.$stateHolder.disabled = false;
                                        });
                                }
                            };

                            scope.$onPopupScrolled = function ($event) {
                                if (scope.selectedDataSet) {
                                    var dataSetSource = scope.getDataSetSource(scope.selectedDataSet);

                                    if (dataSetSource) {
                                        dataSetSource.$showMore();
                                    }
                                }
                            };

                            scope.$onOutsideClick = function () {
                                if (scope.$dataHolder.modelValue === null) {
                                    scope.$clearTypeahead();
                                }

                                scope.$closePopup();
                            };

                            scope.$onKeyDown = function (evt) {
                                var popupOpened = scope.$stateHolder.popup.opened,
                                    suggestedPopupOpened = scope.$stateHolder.suggestedPopup.opened;

                                if ((popupOpened || suggestedPopupOpened) && KEYBOARD_KEYS.indexOf(evt.which) !== -1) {
                                    var activeDataSet,
                                        prevDataSet,
                                        nextDataSet,
                                        dataSetSource;

                                    if (!scope.selectedDataSet) {
                                        scope.$dataSets.forEach(function (dataSet) {
                                            dataSetSource = scope.getDataSetSource(dataSet);

                                            if (dataSetSource && dataSetSource.activeIndex !== -1) {
                                                activeDataSet = dataSet;
                                            } else if (!activeDataSet) {
                                                prevDataSet = dataSet;
                                            } else if (activeDataSet && !nextDataSet) {
                                                nextDataSet = dataSet;
                                            }
                                        });

                                        if (!activeDataSet) {
                                            activeDataSet = scope.$dataSets[0];
                                        }
                                    } else {
                                        activeDataSet = scope.selectedDataSet;
                                    }

                                    evt.preventDefault();

                                    dataSetSource = scope.getDataSetSource(activeDataSet);

                                    if (dataSetSource) {
                                        if (evt.which === 40) { // Down Key
                                            var min = Math.min(dataSetSource.limit, dataSetSource.matches.length);

                                            if (dataSetSource.activeIndex + 1 < min) {
                                                dataSetSource.activeIndex++;
                                            } else if (nextDataSet) {
                                                scope.$setActiveMatch(nextDataSet, 0);
                                            } else {
                                                return;
                                            }

                                            $timeout(scrollToActiveMatch);
                                            scope.$digest();
                                        } else if (evt.which === 38) { // Up Key
                                            if (dataSetSource.activeIndex > 0) {
                                                dataSetSource.activeIndex--;
                                            } else if (prevDataSet) {
                                                dataSetSource = scope.getDataSetSource(prevDataSet);

                                                if (dataSetSource) {
                                                    var min = Math.min(dataSetSource.limit, dataSetSource.matches.length);
                                                    scope.$setActiveMatch(prevDataSet, min - 1);
                                                }
                                            } else {
                                                return;
                                            }

                                            $timeout(scrollToActiveMatch);
                                            scope.$digest();
                                        } else if (evt.which === 13 || evt.which === 32) { // Enter or Space Key
                                            if (activeDataSet) {
                                                scope.$selectMatch(activeDataSet, dataSetSource.activeIndex, dataSetSource.matches[dataSetSource.activeIndex], evt);
                                                scope.$apply();
                                            }
                                        } else if (evt.which === 27) { // Esc Key
                                            scope.$clearTypeahead();
                                            scope.$closePopup();
                                            scope.$digest();
                                        }
                                    }
                                }
                            };

                            scope.$trigger = selfCtrl.trigger.bind(selfCtrl);

                            function collectSources(searchTerm) {
                                var collectedPromises = scope.$dataHolder.collectedPromises,
                                    rcp = scope.$promisesHolder.regularCancelPromise;

                                if (rcp) {
                                    collectedPromises.push(rcp.promise);
                                }

                                scope.$dataSets.forEach(function (dataSet) {
                                    dataSet.data = {};

                                    var sourceLocals = {
                                        $queried: true,
                                        $viewValue: searchTerm,
                                        $internal: scope,
                                        $context: angular.extend({
                                            dataSet: dataSet
                                        }, scope.$prepareSourceContext() || {})
                                    };

                                    var sourceModel = dataSet.queried,
                                        sourceMapper = sourceModel.source.sourceMapper,
                                        sourceResult = sourceMapper(parentScope, sourceLocals),
                                        promise = (isPromise(sourceResult)) ? sourceResult : $q.when(sourceResult);

                                    promise
                                        .then(function (response) {
                                            if (scope.$term === searchTerm) {
                                                sourceModel.matches.length = 0;
                                                sourceModel.$hideMore();

                                                var matches = response;

                                                angular.forEach(matches, function (match) {
                                                    var item = sourceModel.$getItem(match, parentScope),
                                                        matchObj = new MatchModel(match, item.model, item.value);

                                                    scope.$prepareMatchModel(matchObj, dataSet);

                                                    sourceModel.matches.push(matchObj);
                                                });
                                            }
                                        })
                                        .finally(function () {
                                            if (rcp) {
                                                rcp.resolve();
                                            }
                                        });

                                    collectedPromises.push(promise);
                                });

                                return collectedPromises;
                            }

                            function collectSuggestedSources() {
                                var collectedPromises = scope.$dataHolder.collectedPromises,
                                    scp = scope.$promisesHolder.suggestedCancelPromise;

                                if (scp) {
                                    collectedPromises.push(scp.promise);
                                }

                                scope.$dataSets.forEach(function (dataSet) {
                                    if (!dataSet.suggested || !dataSet.suggested.source) {
                                        return;
                                    }

                                    dataSet.data = {};

                                    var sourceLocals = {
                                        $suggested: true,
                                        $internal: scope,
                                        $context: angular.extend({
                                            dataSet: dataSet
                                        }, scope.$prepareSourceContext() || {})
                                    };

                                    var sourceModel = dataSet.suggested,
                                        sourceMapper = sourceModel.source.sourceMapper,
                                        sourceResult = sourceMapper(parentScope, sourceLocals),
                                        promise = (isPromise(sourceResult)) ? sourceResult : $q.when(sourceResult);

                                    promise
                                        .then(function (response) {
                                            sourceModel.matches.length = 0;
                                            sourceModel.$hideMore();

                                            var matches = response;

                                            angular.forEach(matches, function (match) {
                                                var item = sourceModel.$getItem(match, parentScope),
                                                    matchObj = new SuggestedMatchModel(match, item.model, item.value);

                                                scope.$prepareMatchModel(matchObj, dataSet);

                                                sourceModel.matches.push(matchObj);
                                            });
                                        })
                                        .finally(function () {
                                            if (scp) {
                                                scp.resolve();
                                            }
                                        });

                                    collectedPromises.push(promise);
                                });

                                return collectedPromises;
                            }

                            function clearCollectedPromises() {
                                scope.$dataHolder.collectedPromises.length = 0;
                            }

                            function scrollToActiveMatch() {
                                var popupOpened = scope.$stateHolder.popup.opened,
                                    suggestedPopupOpened = scope.$stateHolder.suggestedPopup.opened,
                                    popupElement;

                                if (popupOpened) {
                                    popupElement = scope.$templates.popup.wrapper.element;
                                } else if (suggestedPopupOpened) {
                                    popupElement = scope.$templates.suggestedPopup.wrapper.element;
                                }

                                if (popupElement) {
                                    var suggestionsContainer = popupElement.find('.tg-typeahead__suggestions-container'),
                                        _suggestionsContainer = suggestionsContainer.get(0);

                                    if (_suggestionsContainer) {
                                        if (_suggestionsContainer.clientHeight < _suggestionsContainer.scrollHeight) {
                                            var activeItem = popupElement.find('.tg-typeahead__suggestions-group-item.active'),
                                                _activeItem = activeItem.get(0);

                                            if (_activeItem) {
                                                var cpx = _suggestionsContainer.getBoundingClientRect(),
                                                    cix = _activeItem.getBoundingClientRect();

                                                if (cix.top < cpx.top) {
                                                    _suggestionsContainer.scrollTop += (cix.top - cpx.top);
                                                } else if (cix.bottom > cpx.bottom) {
                                                    _suggestionsContainer.scrollTop += (cix.bottom - cpx.bottom);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            function attachEventsToMatchedItems(element) {
                                element
                                    .on('mouseenter mouseleave mousedown', '.tg-typeahead__suggestions-group-item', function (evt) {
                                        if (evt.target) {
                                            var elScope = angular.element(evt.target).scope();

                                            switch (evt.type) {
                                                case 'mouseenter':
                                                    scope.$setActiveMatch(elScope.$dataSet, elScope.$index);
                                                    elScope.$digest();

                                                    break;
                                                case 'mouseleave':
                                                    var dataSetSource = scope.getDataSetSource(elScope.$dataSet);

                                                    if (dataSetSource) {
                                                        dataSetSource.activeIndex = -1;
                                                    }

                                                    elScope.$digest();

                                                    break;
                                                case 'mousedown':
                                                    if (!elScope.$match.disabled) {
                                                        scope.$selectMatch(elScope.$dataSet, elScope.$index, elScope.$match, evt);
                                                    }

                                                    elScope.$apply();

                                                    break;
                                            }
                                        }
                                    });
                            }
                        }

                        function postLink(scope, element, attrs, controllers) {
                            var onDocumentClick = function (evt) {
                                if (element.has(evt.target).length === 0) {
                                    var popup = scope.$templates.popup.wrapper.element,
                                        suggestedPopup = scope.$templates.suggestedPopup.wrapper.element;

                                    if ((popup && popup.has(evt.target).length === 0) ||
                                        (suggestedPopup && suggestedPopup.has(evt.target).length === 0)) {
                                        scope.$onOutsideClick();
                                        scope.$digest();
                                    }
                                }
                            };

                            var onDocumentKeydown = function (evt) {
                                scope.$onKeyDown(evt);
                            };

                            $document.on('click', onDocumentClick);
                            $document.on('keydown', onDocumentKeydown);

                            scope.$on('$destroy', function () {
                                $document.off('click', onDocumentClick);
                                $document.off('keydown', onDocumentKeydown);
                            });

                            scope.$watch(scope.$getModel, function (model) {
                                scope.$clear();

                                model = scope.$prepareModel(model);

                                scope.$setModel(model, true);
                            });
                        }

                        return {
                            pre: preLink,
                            post: postLink
                        };
                    },
                    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                        var self = this;

                        self.$type = 'tgTypeahead';
                        self.$name = !$scope.tgTypeaheadId ? (self.$type + '_' + $scope.$id) : $scope.tgTypeaheadId;
                        self.$scope = $scope;
                        self.$element = $element;
                        self.$attrs = $attrs;
                        self.$supportEvents = true;

                        this.$setHeaderTemplate = function (tpl) {
                            $scope.$templates.main.header.setTemplate(tpl);
                        };

                        this.$setFooterTemplate = function (tpl) {
                            $scope.$templates.main.footer.setTemplate(tpl);
                        };

                        this.$setPopupHeaderTemplate = function (tpl) {
                            $scope.$templates.popup.header.setTemplate(tpl);
                        };

                        this.$setPopupFooterTemplate = function (tpl) {
                            $scope.$templates.popup.footer.setTemplate(tpl);
                        };

                        this.$setSuggestedPopupHeaderTemplate = function (tpl) {
                            $scope.$templates.suggestedPopup.header.setTemplate(tpl);
                        };

                        this.$setSuggestedPopupFooterTemplate = function (tpl) {
                            $scope.$templates.suggestedPopup.footer.setTemplate(tpl);
                        };

                        this.$addDataSet = function (dataSet) {
                            $scope.$dataSets.push(dataSet);

                            if (dataSet.suggested) {
                                $scope.$stateHolder.hasSuggestions = true;
                            }
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

                        this.clear = function () {
                            $scope.$clearTypeahead();
                        };

                        $tgComponents.$addInstance(self);

                        $scope.$on('$destroy', function () {
                            $tgComponents.$removeInstance(self);
                        });
                    }]
                };
            }
        ])
        .directive('tgTypeaheadDataSet', ['$injector', '$parse',
            function ($injector, $parse) {
                return {
                    restrict: 'A',
                    require: '^tgTypeahead',
                    scope: {
                        tgTypeaheadDataSet: '@',
                        tgTypeaheadDataSetName: '@',
                        tgTypeaheadDataSetLimitStep: '@',
                        tgTypeaheadDataSetDisplayedItems: '@',
                        tgTypeaheadDataSetSuggested: '@'
                    },
                    compile: function (tElement, tAttrs) {
                        var SOURCE_EXPR = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

                        function sourceExprParse(input) {
                            var match = input.match(SOURCE_EXPR);

                            if (!match) {
                                throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_' but got '" + input + "'.");
                            }

                            return {
                                itemName: match[3],
                                sourceMapper: $parse(match[4]),
                                viewMapper: $parse(match[2] || match[1]),
                                modelMapper: $parse(match[1])
                            };
                        }

                        function preLink(scope, element, attrs, tgTypeaheadCtrl) {
                            var limitStep = parseInt(scope.tgTypeaheadDataSetLimitStep) || 9999,
                                displayedItems = parseInt(scope.tgTypeaheadDataSetDisplayedItems) || limitStep,
                                querySource = sourceExprParse(scope.tgTypeaheadDataSet),
                                suggestSource,
                                RenderTemplateModel = $injector.get('tgTypeaheadRenderTemplateModel'),
                                SourceModel = $injector.get('tgTypeaheadSourceModel');

                            if (scope.tgTypeaheadDataSetSuggested) {
                                suggestSource = {
                                    itemName: querySource.itemName,
                                    sourceMapper: $parse(scope.tgTypeaheadDataSetSuggested),
                                    viewMapper: querySource.viewMapper,
                                    modelMapper: querySource.modelMapper
                                };
                            }

                            scope.$dataSet = {
                                name: scope.tgTypeaheadDataSetName || ('dataSet_' + scope.$id),
                                data: undefined,
                                templates: {
                                    header: new RenderTemplateModel('dataSet.header', attrs.tgTypeaheadDataSetHeaderTemplateUrl),
                                    item: new RenderTemplateModel('dataSet.item', attrs.tgTypeaheadDataSetItemTemplateUrl),
                                    footer: new RenderTemplateModel('dataSet.footer', attrs.tgTypeaheadDataSetFooterTemplateUrl)
                                },
                                queried: new SourceModel(querySource, displayedItems, limitStep),
                                suggested: (suggestSource) ? (new SourceModel(suggestSource, displayedItems, limitStep)) : undefined
                            };

                            tgTypeaheadCtrl.$addDataSet(scope.$dataSet);
                        }

                        function postLink(scope, element, attrs, tgTypeaheadCtrl) {
                            // destroy the current isolated scope
                            scope.$destroy();
                            // remove data-set block definition from markup
                            element.remove();
                        }

                        return {
                            pre: preLink,
                            post: postLink
                        };
                    },
                    controller: ['$scope', function ($scope) {
                        this.$setHeaderTemplate = function (tpl) {
                            $scope.$dataSet.templates.header.setTemplate(tpl);
                        };

                        this.$setItemTemplate = function (tpl) {
                            $scope.$dataSet.templates.item.setTemplate(tpl);
                        };

                        this.$setFooterTemplate = function (tpl) {
                            $scope.$dataSet.templates.footer.setTemplate(tpl);
                        };
                    }]
                };
            }
        ])
        .directive('tgTypeaheadHeader', [function () {
            return templateTransclusion('^?tgTypeahead', '$setHeaderTemplate');
        }])
        .directive('tgTypeaheadFooter', [function () {
            return templateTransclusion('^?tgTypeahead', '$setFooterTemplate');
        }])
        .directive('tgTypeaheadPopupHeader', [function () {
            return templateTransclusion('^?tgTypeahead', '$setPopupHeaderTemplate');
        }])
        .directive('tgTypeaheadPopupFooter', [function () {
            return templateTransclusion('^?tgTypeahead', '$setPopupFooterTemplate');
        }])
        .directive('tgTypeaheadDataSetHeader', [function () {
            return templateTransclusion('^?tgTypeaheadDataSet', '$setHeaderTemplate');
        }])
        .directive('tgTypeaheadDataSetItem', [function () {
            return templateTransclusion('^?tgTypeaheadDataSet', '$setItemTemplate');
        }])
        .directive('tgTypeaheadDataSetFooter', [function () {
            return templateTransclusion('^?tgTypeaheadDataSet', '$setFooterTemplate');
        }])
        .directive('tgTypeaheadSuggestedPopupHeader', [function () {
            return templateTransclusion('^?tgTypeahead', '$setSuggestedPopupHeaderTemplate');
        }])
        .directive('tgTypeaheadSuggestedPopupFooter', [function () {
            return templateTransclusion('^?tgTypeahead', '$setSuggestedPopupFooterTemplate');
        }])
        .directive('tgTypeaheadRenderTemplate', ['$http', '$compile', '$parse', '$templateCache',
            function ($http, $compile, $parse, $templateCache) {
                return {
                    restrict: 'A',
                    scope: false,
                    compile: function (tElement, tAttrs) {
                        var renderTpl = $parse(tAttrs.tgTypeaheadRenderTemplate);

                        function postLink(scope, element, attrs) {
                            element.empty();

                            var renderTplModel = renderTpl(scope);

                            if (renderTplModel && renderTplModel.template) {
                                renderTplModel.template(scope, function (contents) {
                                    element.append(contents);
                                });

                                if (renderTplModel.appendToBody) {
                                    element.detach().appendTo('body');
                                }

                                renderTplModel.render(element);
                            } else if (renderTplModel && renderTplModel.templateUrl) {
                                $http.get(renderTplModel.templateUrl, {cache: $templateCache})
                                    .success(function (tplContent) {
                                        element.append($compile(tplContent.trim())(scope));

                                        if (renderTplModel.appendToBody) {
                                            element.detach().appendTo('body');
                                        }

                                        renderTplModel.render(element);
                                    });
                            } else {
                                element.remove();
                            }
                        }

                        return {
                            pre: undefined,
                            post: postLink
                        };
                    }
                };
            }
        ])
        .directive('tgTypeaheadTagManager', ['$injector', '$http', '$compile', '$parse', '$templateCache', '$q', '$timeout',
            function ($injector, $http, $compile, $parse, $templateCache, $q, $timeout) {
                return {
                    restrict: 'A',
                    require: ['tgTypeahead', '?ngModel'],
                    scope: false,
                    priority: 3,
                    compile: function (tElement, tAttrs) {
                        var maxLines = Math.abs(parseInt(tAttrs.tgTypeaheadMaxLines) || 0),
                            maxSelectedTags = Math.abs(parseInt(tAttrs.tgTypeaheadMaxSelectedTags) || 0),
                            allowDuplicates = (tAttrs.tgTypeaheadAllowDuplicates === 'true'),
                            postponedSelection = (tAttrs.tgTypeaheadPostponedSelection === 'true'),
                            ascendingOrder = (tAttrs.tgTypeaheadTagAscendingOrder === 'true'),
                            RenderTemplateModel = $injector.get('tgTypeaheadRenderTemplateModel'),
                            MatchModel = $injector.get('tgTypeaheadMatchModel'),
                            TagModel = $injector.get('tgTypeaheadTagModel');

                        function preLink(scope, element, attrs, controllers) {
                            var tgTypeaheadCtrl = controllers[0],
                                ngModelCtrl = controllers[1];

                            scope = tgTypeaheadCtrl.$scope;

                            scope.$tags = [];
                            scope.$tagsOrder = function () {
                                return 0;
                            };

                            if (ascendingOrder) {
                                scope.$tagsOrder = ['match.value'];
                            }

                            // Set Templates
                            scope.$templates.tagManager = {
                                wrapper: new RenderTemplateModel('tagManager.wrapper', attrs.tgTypeaheadTagManagerTemplateUrl || 'tg-typeahead-tag-manager.tpl.html'),
                                tag: new RenderTemplateModel('tagManager.tag', attrs.tgTypeaheadTagTemplateUrl || 'tg-typeahead-tag.tpl.html')
                            };

                            scope.$templates.main.header = new RenderTemplateModel('tagManager.wrapper', attrs.tgTypeaheadTagManagerTemplateUrl || 'tg-typeahead-tag-manager.tpl.html');

                            if (maxLines > 0) {
                                scope.$templates.popup.wrapper.appendToBody = true;
                                scope.$templates.suggestedPopup.wrapper.appendToBody = true;
                            }

                            // internal functionality
                            scope.$canAddTag = function () {
                                return (maxSelectedTags === 0 || maxSelectedTags > scope.$tags.length);
                            };

                            scope.$addTag = function (tag) {
                                if (tag && tag.match && scope.$canAddTag()) {
                                    var evt = {
                                        context: scope.tgTypeaheadContext,
                                        tag: tag
                                    };

                                    return tgTypeaheadCtrl.events
                                        .emit('onTagAdding', evt)
                                        .then(function () {
                                            if (tag.dataSet) {
                                                var model = scope.$getModel(),
                                                    src = model;

                                                if (src) {
                                                    if (scope.$dataSets.length > 1) {
                                                        src = src[tag.dataSet.name];
                                                    }

                                                    var idx = -1;

                                                    if (!allowDuplicates) {
                                                        // check if match model already exist in model
                                                        for (var i = 0, ln = src.length; i < ln; i++) {
                                                            if (angular.equals(src[i], tag.match.model)) {
                                                                idx = i;
                                                                break;
                                                            }
                                                        }
                                                    }

                                                    if (idx === -1) {
                                                        src.push(tag.match.model);
                                                    }
                                                }
                                            }

                                            scope.$tags.push(tag);

                                            tgTypeaheadCtrl.events.emit('onTagAdded', evt);

                                            return tag;
                                        });
                                }

                                return $q.when(undefined);
                            };

                            scope.$removeTag = function (tag) {
                                var idx = scope.$tags.indexOf(tag);

                                if (idx !== -1) {
                                    var evt = {
                                        context: scope.tgTypeaheadContext,
                                        index: idx,
                                        tag: tag
                                    };

                                    return tgTypeaheadCtrl.events
                                        .emit('onTagRemoving', evt)
                                        .then(function () {
                                            if (tag.dataSet) {
                                                var model = scope.$getModel(),
                                                    src = model;

                                                if (scope.$dataSets.length > 1 && src) {
                                                    src = src[tag.dataSet.name];
                                                }

                                                if (src) {
                                                    var idx = -1;

                                                    // check if match model already exist in model
                                                    for (var i = 0, ln = src.length; i < ln; i++) {
                                                        if (angular.equals(src[i], tag.match.model)) {
                                                            idx = i;
                                                            break;
                                                        }
                                                    }

                                                    if (idx !== -1) {
                                                        src.splice(idx, 1);
                                                    }
                                                }
                                            }

                                            idx = scope.$tags.indexOf(tag);

                                            if (idx !== -1) {
                                                scope.$tags.splice(idx, 1);

                                                tgTypeaheadCtrl.events.emit('onTagRemoved', evt);
                                            }
                                        });
                                }

                                return $q.when(false);
                            };

                            scope.$findTag = function (match) {
                                for (var i = 0, ln = scope.$tags.length; i < ln; i++) {
                                    if (angular.equals(scope.$tags[i].match.model, match.model)) {
                                        return scope.$tags[i];
                                    }
                                }
                            };

                            scope.$clearTags = function () {
                                for (var i = scope.$tags.length - 1; i >= 0; i--) {
                                    scope.$removeTag(scope.$tags[i]);
                                }
                            };

                            scope.hasAllSelected = function (dataSet) {
                                var dataSetSource = scope.getDataSetSource(dataSet);

                                if (dataSetSource && dataSetSource.matches.length > 0) {
                                    for (var i = 0, ln = dataSetSource.matches.length; i < ln; i++) {
                                        if (!dataSetSource.matches[i].selected) {
                                            return false;
                                        }
                                    }

                                    return true;
                                }

                                return false;
                            };

                            scope.selectAll = function (dataSet, $event) {
                                if ($event) {
                                    $event.stopPropagation();
                                    // emulate ctrl key hold for multi-selection
                                    $event.ctrlKey = true;
                                }

                                var dataSetSource = scope.getDataSetSource(dataSet);

                                if (dataSetSource) {
                                    dataSetSource.matches.forEach(function (match, index) {
                                        if (!match.selected) {
                                            scope.$selectMatch(dataSet, index, match, $event);
                                        }
                                    });
                                }
                            };

                            scope.deselectAll = function (dataSet, $event) {
                                if ($event) {
                                    $event.stopPropagation();
                                    // emulate ctrl key hold for multi-deselection
                                    $event.ctrlKey = true;
                                }

                                var dataSetSource = scope.getDataSetSource(dataSet);

                                if (dataSetSource) {
                                    dataSetSource.matches.forEach(function (match, index) {
                                        if (match.selected) {
                                            scope.$selectMatch(dataSet, index, match, $event);
                                        }
                                    });
                                }
                            };

                            scope.applySelections = function (dataSets) {
                                dataSets.forEach(function (dataSet) {
                                    var dataSetSource = scope.getDataSetSource(dataSet);

                                    if (dataSetSource) {
                                        dataSetSource.matches.forEach(function (match) {
                                            var tag = scope.$findTag(match);

                                            if (match.selected) {
                                                if (tag === undefined) {
                                                    tag = new TagModel(match, { name: dataSet.name });

                                                    scope.$addTag(tag);
                                                }
                                            } else {
                                                var tag = scope.$findTag(match);

                                                if (tag !== undefined) {
                                                    scope.$removeTag(tag);
                                                }
                                            }
                                        });
                                    }
                                });

                                scope.$closePopup();
                            };

                            /**
                             * tgTypeahead methods overrides
                             */
                            tgTypeaheadCtrl.$overrideFn('$applyMatch', function (dataSet, model, recallBase) {
                                if (recallBase) {
                                    this.$baseFn(dataSet, model);
                                }
                            });

                            tgTypeaheadCtrl.$overrideFn('$onOutsideClick', function () {
                                scope.$clearTypeahead();

                                this.$baseFn();
                            });

                            tgTypeaheadCtrl.$overrideFn('$onKeyDown', function (evt) {
                                if (evt.which === 8 && scope.$term === null) {
                                    if (scope.$isFocusedInput()) {
                                        if (scope.$tags.length > 0) {
                                            scope.$removeTag(scope.$tags[scope.$tags.length - 1]);
                                        }
                                    }
                                } else {
                                    this.$baseFn(evt);
                                }
                            });

                            tgTypeaheadCtrl.$overrideFn('$getPlaceholder', function () {
                                return this.$baseFn();
                            });

                            tgTypeaheadCtrl.$overrideFn('$isVisibleInput', function () {
                                var result = this.$baseFn();

                                if (result) {
                                    if (maxSelectedTags > 0 && maxSelectedTags <= scope.$tags.length) {
                                        result = false;
                                    }
                                }

                                if (result) {
                                    scope.$updateInputElement();
                                }

                                return result;
                            });

                            tgTypeaheadCtrl.$overrideFn('$isVisibleClear', function () {
                                return (attrs.tgTypeaheadDisplayClean === 'true' && scope.$tags.length > 1);
                            });

                            tgTypeaheadCtrl.$overrideFn('$clear', function ($event) {
                                this.$baseFn($event);

                                scope.$clearTags();
                            });

                            tgTypeaheadCtrl.$overrideFn('$selectMatch', function (dataSet, index, match, $event) {
                                var evt = {
                                    context: scope.tgTypeaheadContext,
                                    dataSet: dataSet,
                                    index: index,
                                    match: match
                                };

                                tgTypeaheadCtrl.trigger('onMatchSelecting', evt)
                                    .then(function () {
                                        if (!postponedSelection) {
                                            var tag = scope.$findTag(match);

                                            // multi selection: select / deselect
                                            if (tag === undefined || allowDuplicates) {
                                                tag = new TagModel(match, { name: dataSet.name });

                                                scope.$addTag(tag);

                                                match.selected = true;
                                            } else {
                                                scope.$removeTag(tag);

                                                match.selected = false;
                                            }
                                        } else {
                                            match.selected = !match.selected;
                                        }

                                        if (!postponedSelection &&
                                            (!$event || !($event.ctrlKey | $event.metaKey))) {
                                            scope.$onOutsideClick();
                                        }
                                    });
                            });

                            tgTypeaheadCtrl.$overrideFn('$prepareDefaultModel', function () {
                                var single = (scope.$dataSets.length === 1),
                                    multiple = (scope.$dataSets.length > 1),
                                    model = null;

                                if (single) {
                                    model = [];
                                } else if (multiple) {
                                    model = {};

                                    scope.$dataSets.forEach(function (dataSet) {
                                        model[dataSet.name] = [];
                                    });
                                }

                                return model;
                            });

                            tgTypeaheadCtrl.$overrideFn('$prepareModel', function (model) {
                                if (model === undefined) {
                                    return scope.$prepareDefaultModel();
                                }

                                var single = (scope.$dataSets.length === 1),
                                    multiple = (scope.$dataSets.length > 1),
                                    activeSources = [];

                                if (single) {
                                    if (Array.isArray(model) && model.length > 0) {
                                        activeSources.push({
                                            dataSet: scope.$dataSets[0],
                                            source: model
                                        });
                                    }
                                } else if (multiple) {
                                    if (!model || Array.isArray(model) || !angular.isObject(model)) {
                                        model = {};
                                    }

                                    scope.$dataSets.forEach(function (dataSet) {
                                        if (!model.hasOwnProperty(dataSet.name) || !Array.isArray(model[dataSet.name])) {
                                            model[dataSet.name] = [];
                                        }

                                        if (model[dataSet.name].length > 0) {
                                            activeSources.push({
                                                dataSet: dataSet,
                                                source: model[dataSet.name]
                                            });
                                        }
                                    });
                                }

                                if (activeSources.length > 0) {
                                    activeSources.forEach(function (activeSource) {
                                        var dataSet = activeSource.dataSet,
                                            sourceModel = dataSet.queried;

                                        activeSource.source.forEach(function (match) {
                                            var item = sourceModel.$getItem(match, scope.$parent),
                                                match = new MatchModel(match, item.model, item.value),
                                                tag = new TagModel(match, { name: dataSet.name });

                                            scope.$addTag(tag);
                                        });
                                    });
                                }

                                return model;
                            });

                            tgTypeaheadCtrl.$overrideFn('$prepareMatchModel', function (matchModel, dataSet) {
                                if (!allowDuplicates && scope.$tags.length > 0) {
                                    var tag = scope.$findTag(matchModel);

                                    if (tag !== undefined) {
                                        matchModel.selected = true;
                                    }
                                }
                            });

                            tgTypeaheadCtrl.$overrideFn('$updateInputElement', function () {
                                /*var inputEl = scope.$$getTypeaheadInputEl();

                                var maxWidth = element.width(),
                                    listWidth = (function () {
                                        var bottomRowWidth = 0,
                                            tagEl, tagWidth;

                                        element.find('.tg-typeahead__tag')
                                            .each(function () {
                                                tagEl = angular.element(this);
                                                tagWidth = tagEl.outerWidth() + parseInt(tagEl.css('margin-left')) + parseInt(tagEl.css('margin-right'));
                                                bottomRowWidth += tagWidth;
                                                if (bottomRowWidth > maxWidth) bottomRowWidth = tagWidth;
                                            });

                                        return bottomRowWidth;
                                    }());

                                if (listWidth > 0) {
                                    var diff = maxWidth - listWidth,
                                        queryInputWidth = (diff < 100) ? maxWidth : diff;

                                    if (queryInputWidth >= 9) {
                                        queryInputWidth -= 9;
                                    }

                                    inputEl.css('width', queryInputWidth + 'px');
                                } else {
                                    inputEl.css('width', '100%');
                                }*/
                            });

                            /**
                             * tgTypeahead controller additional methods
                             */
                            tgTypeaheadCtrl.getTags = function () {
                                var tags = [];

                                scope.$tags.forEach(function (tag) {
                                    tags.push(tag);
                                });

                                return tags;
                            };

                            tgTypeaheadCtrl.addTag = function (match, dataSet) {
                                var tag = new TagModel(match, { name: dataSet.name });

                                return scope.$addTag(tag);
                            };

                            tgTypeaheadCtrl.removeTag = function (tag) {
                                return scope.$removeTag(tag);
                            };

                            tgTypeaheadCtrl.clearTags = function () {
                                scope.$clearTags();
                            };

                            /**
                             * watches
                             */
                            scope.$watch('$tags', function (tags) {
                                if (attrs.required) {
                                    $timeout(function () {
                                        ngModelCtrl.$setValidity('tagsRequired', (tags.length !== 0));
                                    });
                                }
                            }, true);
                        }

                        return {
                            pre: preLink,
                            post: undefined
                        };
                    }
                };
            }
        ])
        .factory('tgTypeaheadRenderTemplateModel', [function () {
            function RenderTemplateModelFactory(name, templateUrl, renderCallback) {
                this.name = name;
                this.templateUrl = templateUrl;
                this.template = undefined;
                this.appendToBody = false;
                this.strictWidth = false;
                this.element = undefined;
                this.style = undefined;
                this.callback = renderCallback;
            }

            RenderTemplateModelFactory.prototype.setTemplate = function (tpl) {
                this.template = tpl;
            };

            RenderTemplateModelFactory.prototype.render = function (element) {
                this.element = element;

                if (angular.isFunction(this.callback)) {
                    this.callback(this);
                }
            };

            return RenderTemplateModelFactory;
        }])
        .factory('tgTypeaheadSourceModel', [function () {
            function SourceModelFactory(source, displayedItems, limitStep) {
                this.source = source;
                this.matches = [];
                this.displayedItems = displayedItems;
                this.limitStep = limitStep;
                this.limit = displayedItems;
                this.active = true;
                this.activeIndex = -1;
            }

            SourceModelFactory.prototype.$hasMore = function () {
                return (this.limit < this.matches.length);
            };

            SourceModelFactory.prototype.$showAll = function ($event) {
                this.limit = this.matches.length;

                if ($event) {
                    $event.stopPropagation();
                }
            };

            SourceModelFactory.prototype.$showMore = function ($event) {
                var limit = this.limit + this.limitStep;

                if (limit > this.matches.length) {
                    limit = this.matches.length;
                }

                if (limit < this.limitStep) {
                    limit = this.limitStep;
                }

                this.limit = limit;

                if ($event) {
                    $event.stopPropagation();
                }
            };

            SourceModelFactory.prototype.$hideMore = function ($event) {
                this.limit = this.displayedItems;

                if ($event) {
                    $event.stopPropagation();
                }
            };

            SourceModelFactory.prototype.$getItem = function (match, scope) {
                var matchLocals = {},
                    itemName = this.source.itemName,
                    viewMapper = this.source.viewMapper,
                    modelMapper = this.source.modelMapper;

                matchLocals[itemName] = match;

                return {
                    model: modelMapper(scope, matchLocals),
                    value: viewMapper(scope, matchLocals)
                };
            };

            return SourceModelFactory;
        }])
        .factory('tgTypeaheadMatchModel', [function () {
            function MatchModelFactory(data, model, value) {
                this.data = data;
                this.model = model;
                this.value = value;
                this.selected = false;
                this.disabled = false;
            }

            return MatchModelFactory;
        }])
        .factory('tgTypeaheadSuggestedMatchModel', [function () {
            function SuggestedMatchModelFactory(data, model, value) {
                this.data = data;
                this.model = model;
                this.value = value;
                this.selected = false;
                this.disabled = false;
                this.suggested = true;
            }

            return SuggestedMatchModelFactory;
        }])
        .factory('tgTypeaheadTagModel', [function () {
            function TagModelFactory(match, dataSet) {
                this.match = match;
                this.dataSet = dataSet;
            }

            return TagModelFactory;
        }])
        .factory('tgTypeaheadFilterTagModel', [function () {
            function FilterTagModelFactory(match) {
                this.match = match;
                this.filter = undefined;
                this.filters = [];
            }

            return FilterTagModelFactory;
        }]);
})();
