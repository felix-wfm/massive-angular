/*
 ** Dependencies: tgWhenScrolled
 */

(function () {
    'use strict';

    angular.module('tg.components')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('tg-typeahead.tpl.html',
                '<div class="tg-typeahead" \
                      ng-class="tgTypeaheadWrapClass">\
                   <div tg-component-render-template="$templates.main.header"></div>\
                   <div tg-component-render-template="$templates.main.container"></div>\
                   <div tg-component-render-template="$templates.main.footer"></div>\
                   <div class="tg-typeahead__suggestions-wrap" \
                        tg-component-render-template="$templates.popup.wrapper"></div>\
                   <div class="tg-typeahead__suggestions-wrap" \
                        ng-if="$stateHolder.hasSuggestions" \
                        tg-component-render-template="$templates.suggestedPopup.wrapper"></div>\
                </div>');

            $templateCache.put('tg-typeahead-container.tpl.html',
                '<div class="tg-typeahead__input-container" \
                      ng-show="$isVisibleInput() && !$stateHolder.tagsTransformed">\
                    <a href="" class="tg-typeahead__clear-link" \
                       ng-show="!$stateHolder.loader && $isVisibleClear()" \
                       ng-click="$clear($event);">Remove All</a>\
                    <div class="tg-typeahead__loader" \
                         ng-show="$stateHolder.loader"></div>\
                    <div class="tg-typeahead__input-wrap">\
                        <input type="text" class="tg-typeahead__input" \
                               placeholder="{{ $getPlaceholder() }}" \
                               ng-model="$term" \
                               ng-disabled="$isDisabled()">\
                    </div>\
                </div>');

            $templateCache.put('tg-typeahead-popup.tpl.html',
                '<ul class="tg-typeahead__suggestions" \
                     ng-if="$stateHolder.popup.opened" \
                     ng-style="$templates.popup.wrapper.style">\
                    <li class="tg-typeahead__suggestions-header" \
                        tg-component-render-template="$templates.popup.header"></li>\
                    <li class="tg-typeahead__suggestions-container" \
                        tg-when-scrolled="$onPopupScrolled($event);">\
                        <div ng-repeat="$dataSet in $dataSets | filter:{ queried: { active: true } }">\
                            <div class="tg-typeahead__suggestions-group-header" \
                                 tg-component-render-template="$dataSet.templates.header || $templates.dataSet.header"></div>\
                            <ul class="tg-typeahead__suggestions-group">\
                                <li class="tg-typeahead__suggestions-group-item" \
                                    ng-repeat="$match in $dataSet.queried.matches | limitTo:$dataSet.queried.limit" \
                                    ng-class="{ active: $index === $dataSet.queried.activeIndex, selected: $match.selected, disabled: $match.disabled }">\
                                    <div tg-component-render-template="$dataSet.templates.item || $templates.dataSet.item"></div>\
                                </li>\
                            </ul>\
                            <div class="tg-typeahead__suggestions-group-footer" \
                                 tg-component-render-template="$dataSet.templates.footer || $templates.dataSet.footer"></div>\
                        </div>\
                    </li>\
                    <li class="tg-typeahead__suggestions-footer" \
                        tg-component-render-template="$templates.popup.footer"></li>\
                </ul>');

            $templateCache.put('tg-typeahead-dataSet-item.tpl.html',
                '<div ng-bind-html="$match.value | tgTrustedHtml"></div>');

            $templateCache.put('tg-typeahead-suggested-popup.tpl.html',
                '<ul class="tg-typeahead__suggestions" \
                     ng-if="$stateHolder.suggestedPopup.opened" \
                     ng-style="$templates.suggestedPopup.wrapper.style">\
                    <li class="tg-typeahead__suggestions-header" \
                        tg-component-render-template="$templates.suggestedPopup.header"></li>\
                    <li class="tg-typeahead__suggestions-container" \
                        tg-when-scrolled="$onPopupScrolled($event);">\
                        <div ng-repeat="$dataSet in $dataSets | filter:{ suggested: { active: true } }">\
                            <div class="tg-typeahead__suggestions-group-header" \
                                 tg-component-render-template="$dataSet.templates.header || $templates.dataSet.header"></div>\
                            <ul class="tg-typeahead__suggestions-group">\
                                <li class="tg-typeahead__suggestions-group-item" \
                                    ng-repeat="$match in $dataSet.suggested.matches | limitTo:$dataSet.suggested.limit" \
                                    ng-class="{ active: $index === $dataSet.suggested.activeIndex, selected: $match.selected, disabled: $match.disabled }">\
                                    <div tg-component-render-template="$dataSet.templates.item || $templates.dataSet.item"></div>\
                                </li>\
                            </ul>\
                            <div class="tg-typeahead__suggestions-group-footer" \
                                 tg-component-render-template="$dataSet.templates.footer || $templates.dataSet.footer"></div>\
                        </div>\
                    </li>\
                    <li class="tg-typeahead__suggestions-footer" \
                        tg-component-render-template="$templates.suggestedPopup.footer"></li>\
                </ul>');

            $templateCache.put('tg-typeahead-suggested-dataSet-item.tpl.html',
                '<div ng-bind-html="$match.value | tgTrustedHtml"></div>');

            $templateCache.put('tg-typeahead-tag-manager.tpl.html',
                '<div class="tg-typeahead__tag-manager" \
                      ng-class="$templates.tagManager.wrapper.class" \
                      ng-style="$templates.tagManager.wrapper.style" \
                      ng-switch="$stateHolder.tagsTransformed">\
                   <div ng-switch-when="false">\
                       <div ng-repeat="$tag in $tags | orderBy:$tagsOrder" \
                            tg-component-render-template="$templates.tagManager.tag"></div>\
                   </div>\
                   <div class="tg-typeahead__tags-text" \
                        ng-switch-when="true">{{ $getTagsText() }}</div>\
                </div>');

            $templateCache.put('tg-typeahead-tag.tpl.html',
                '<div class="tg-typeahead__tag">\
                    <span class="tg-typeahead__tag-remove fa fa-times" rel="tooltip" \
                          tooltip-html-unsafe="delete" \
                          tooltip-placement="right" \
                          ng-class="{\'disabled\': $isDisabled()}" \
                          ng-click="!$isDisabled() && $removeTag($tag)"></span>\
                    <span class="tg-typeahead__tag-name" \
                          ng-bind-html="$tag.match.value | tgTrustedHtml"></span>\
                </div>');

            $templateCache.put('tg-typeahead-filter-manager.tpl.html',
                '<div class="tg-typeahead__tag-manager">\
                    <div ng-repeat="$filterTag in $filters.tags">\
                        <div tg-component-render-template="$templates.filterManager.tag"></div>\
                    </div>\
                </div>');

            $templateCache.put('tg-typeahead-filter-tag.tpl.html',
                '<div class="tg-typeahead__tag-wrap">\
                    <div style="display: table-cell; vertical-align: top;" ng-switch="!!$filterTag.match">\
                        <div class="tg-typeahead__tag-filter" ng-switch-when="true" ng-bind-html="$filterTag.filter.value | tgTrustedHtml"></div>\
                        <select class="tg-typeahead__tag-filter" \
                                ng-model="$filterTag.filter" \
                                ng-change="$onFilterTypeSelect($filterTag, $filterTag.filter);" \
                                ng-options="filter.value for filter in $filterTag.filters track by filter.type" \
                                ng-switch-default=""></select>\
                    </div>\
                    <div class="tg-typeahead__tag" style="display: table-cell; vertical-align: top;" ng-show="$filterTag.match !== null">\
                       <span class="tg-typeahead__tag-remove fa fa-times" rel="tooltip" \
                             tooltip-placement="right" \
                             tooltip-html-unsafe="delete" \
                             ng-class="{\'disabled\': $isDisabled()}" \
                             ng-click="!$isDisabled() && removeFilterTag($filterTag)"></span>\
                       <span class="tg-typeahead__tag-name" ng-bind-html="$filterTag.match | tgTrustedHtml"></span>\
                    </div>\
                </div>');
        }])
        .directive('tgTypeahead', tgTypeahead)
        .directive('tgTypeaheadDataSet', tgTypeaheadDataSet)
        .directive('tgTypeaheadTagManager', tgTypeaheadTagManager)
        .directive('tgTypeaheadFilterManager', tgTypeaheadFilterManager)
        .directive('tgTypeaheadHeader', tgTypeaheadHeader)
        .directive('tgTypeaheadFooter', tgTypeaheadFooter)
        .directive('tgTypeaheadPopupHeader', tgTypeaheadPopupHeader)
        .directive('tgTypeaheadPopupFooter', tgTypeaheadPopupFooter)
        .directive('tgTypeaheadDataSetHeader', tgTypeaheadDataSetHeader)
        .directive('tgTypeaheadDataSetItem', tgTypeaheadDataSetItem)
        .directive('tgTypeaheadDataSetFooter', tgTypeaheadDataSetFooter)
        .directive('tgTypeaheadSuggestedPopupHeader', tgTypeaheadSuggestedPopupHeader)
        .directive('tgTypeaheadSuggestedPopupFooter', tgTypeaheadSuggestedPopupFooter)
        .factory('tgTypeaheadDataSetModel', tgTypeaheadDataSetModel)
        .factory('tgTypeaheadSourceModel', tgTypeaheadSourceModel)
        .factory('tgTypeaheadMatchModel', tgTypeaheadMatchModel)
        .factory('tgTypeaheadSuggestedMatchModel', tgTypeaheadSuggestedMatchModel)
        .factory('tgTypeaheadTagModel', tgTypeaheadTagModel)
        .factory('tgTypeaheadFilterTagModel', tgTypeaheadFilterTagModel);

    /*
     * TYPE-AHEAD
     */
    tgTypeahead.$inject = ['$tgComponents', '$injector', '$compile', '$parse', '$q', '$timeout', '$interval', '$document'];

    function tgTypeahead($tgComponents, $injector, $compile, $parse, $q, $timeout, $interval, $document) {
        return {
            restrict: 'A',
            require: ['tgTypeahead', '?ngModel'],
            scope: {
                tgTypeahead: '=?',
                tgTypeaheadId: '@',
                tgTypeaheadContext: '=',
                tgTypeaheadWrapClass: '@',
                tgTypeaheadDisabled: '=?',
                tgTypeaheadSelected: '@',
                tgTypeaheadDefaultTerm: '@',
                tgTypeaheadDefaultFilter: '@'
            },
            priority: 4,
            compile: function (tElement, tAttrs) {
                var KEYBOARD_KEYS = [9, 13, 27, 32, 38, 40];

                var $getModelValue = $parse(tAttrs.ngModel),
                    $setModelValue = $getModelValue.assign,
                    RenderTemplateModel = $injector.get('tgComponentRenderTemplateModel'),
                    MatchModel = $injector.get('tgTypeaheadMatchModel'),
                    SuggestedMatchModel = $injector.get('tgTypeaheadSuggestedMatchModel'),
                    Utilities = $injector.get('tgUtilities');

                function prepareOptions(obj, attrs) {
                    var options = {};

                    if (attrs.tgTypeaheadPlaceholder) {
                        options.placeholder = attrs.tgTypeaheadPlaceholder;
                    } else {
                        options.placeholder = obj && obj.placeholder || '';
                    }

                    if (attrs.tgTypeaheadMinLength) {
                        options.minLength = Math.abs(parseInt(attrs.tgTypeaheadMinLength))
                    } else {
                        options.minLength = obj && obj.minLength || 0;
                    }

                    if (attrs.tgTypeaheadDelay) {
                        options.delay = Math.abs(parseInt(attrs.tgTypeaheadDelay))
                    } else {
                        options.delay = obj && obj.delay || 500;
                    }

                    if (attrs.tgTypeaheadPopupAppendTo) {
                        options.popupAppendTo = attrs.tgTypeaheadPopupAppendTo;
                    } else {
                        options.popupAppendTo = obj && obj.popupAppendTo || undefined;
                    }

                    if (attrs.tgTypeaheadPopupAppendToBody === 'true') {
                        options.popupAppendTo = 'body';
                    }

                    if (attrs.tgTypeaheadPopupStrictWidth) {
                        options.popupStrictWidth = (attrs.tgTypeaheadPopupStrictWidth !== 'false');
                    } else {
                        options.popupStrictWidth = obj && obj.popupStrictWidth || true;
                    }

                    if (attrs.tgTypeaheadDisplayClean) {
                        options.displayClean = (attrs.tgTypeaheadDisplayClean === 'true');
                    } else {
                        options.displayClean = obj && obj.displayClean || false;
                    }

                    if (attrs.tgTypeaheadTemplateUrl) {
                        options.templateUrl = attrs.tgTypeaheadTemplateUrl;
                    } else {
                        options.templateUrl = obj && obj.templateUrl || 'tg-typeahead.tpl.html';
                    }

                    if (attrs.tgTypeaheadHeaderTemplateUrl) {
                        options.headerTemplateUrl = attrs.tgTypeaheadHeaderTemplateUrl;
                    } else {
                        options.headerTemplateUrl = obj && obj.headerTemplateUrl || undefined;
                    }

                    if (attrs.tgTypeaheadContainerTemplateUrl) {
                        options.containerTemplateUrl = attrs.tgTypeaheadContainerTemplateUrl;
                    } else {
                        options.containerTemplateUrl = obj && obj.containerTemplateUrl || 'tg-typeahead-container.tpl.html';
                    }

                    if (attrs.tgTypeaheadFooterTemplateUrl) {
                        options.footerTemplateUrl = attrs.tgTypeaheadFooterTemplateUrl;
                    } else {
                        options.footerTemplateUrl = obj && obj.footerTemplateUrl || undefined;
                    }

                    if (attrs.tgTypeaheadPopupTemplateUrl) {
                        options.popupTemplateUrl = attrs.tgTypeaheadPopupTemplateUrl;
                    } else {
                        options.popupTemplateUrl = obj && obj.popupTemplateUrl || 'tg-typeahead-popup.tpl.html';
                    }

                    if (attrs.tgTypeaheadPopupHeaderTemplateUrl) {
                        options.popupHeaderTemplateUrl = attrs.tgTypeaheadPopupHeaderTemplateUrl;
                    } else {
                        options.popupHeaderTemplateUrl = obj && obj.popupHeaderTemplateUrl || undefined;
                    }

                    if (attrs.tgTypeaheadPopupFooterTemplateUrl) {
                        options.popupFooterTemplateUrl = attrs.tgTypeaheadPopupFooterTemplateUrl;
                    } else {
                        options.popupFooterTemplateUrl = obj && obj.popupFooterTemplateUrl || undefined;
                    }

                    if (attrs.tgTypeaheadSuggestedPopupTemplateUrl) {
                        options.suggestedPopupTemplateUrl = attrs.tgTypeaheadSuggestedPopupTemplateUrl;
                    } else {
                        options.suggestedPopupTemplateUrl = obj && obj.suggestedPopupTemplateUrl || 'tg-typeahead-suggested-popup.tpl.html';
                    }

                    if (attrs.tgTypeaheadSuggestedPopupHeaderTemplateUrl) {
                        options.suggestedPopupHeaderTemplateUrl = attrs.tgTypeaheadSuggestedPopupHeaderTemplateUrl;
                    } else {
                        options.suggestedPopupHeaderTemplateUrl = obj && obj.suggestedPopupHeaderTemplateUrl || undefined;
                    }

                    if (attrs.tgTypeaheadSuggestedPopupFooterTemplateUrl) {
                        options.suggestedPopupFooterTemplateUrl = attrs.tgTypeaheadSuggestedPopupFooterTemplateUrl;
                    } else {
                        options.suggestedPopupFooterTemplateUrl = obj && obj.suggestedPopupFooterTemplateUrl || undefined;
                    }

                    if (attrs.tgTypeaheadDataSetsHeaderTemplateUrl) {
                        options.dataSetsHeaderTemplateUrl = attrs.tgTypeaheadDataSetsHeaderTemplateUrl;
                    } else {
                        options.dataSetsHeaderTemplateUrl = obj && obj.dataSetsHeaderTemplateUrl || undefined;
                    }

                    if (attrs.tgTypeaheadDataSetsItemTemplateUrl) {
                        options.dataSetsItemTemplateUrl = attrs.tgTypeaheadDataSetsItemTemplateUrl;
                    } else {
                        options.dataSetsItemTemplateUrl = obj && obj.dataSetsItemTemplateUrl || 'tg-typeahead-dataSet-item.tpl.html';
                    }

                    if (attrs.tgTypeaheadDataSetsFooterTemplateUrl) {
                        options.dataSetsFooterTemplateUrl = attrs.tgTypeaheadDataSetsFooterTemplateUrl;
                    } else {
                        options.dataSetsFooterTemplateUrl = obj && obj.dataSetsFooterTemplateUrl || undefined;
                    }

                    return options;
                }

                function preLink(scope, element, attrs, controllers) {
                    var parentScope = scope.$external = scope.$parent,
                        selfCtrl = controllers[0],
                        ngModelCtrl = controllers[1],
                        timeoutPromise;

                    var options = prepareOptions(scope.tgTypeahead, attrs);

                    scope.selectedDataSet = null;
                    scope.$dataSets = [];

                    scope.$templates = {
                        main: {
                            wrapper: new RenderTemplateModel('main.wrapper', options.templateUrl, renderTemplateCallback),
                            header: new RenderTemplateModel('main.header', options.headerTemplateUrl, renderTemplateCallback),
                            container: new RenderTemplateModel('main.container', options.containerTemplateUrl, renderTemplateCallback),
                            footer: new RenderTemplateModel('main.footer', options.footerTemplateUrl, renderTemplateCallback)
                        },
                        popup: {
                            wrapper: new RenderTemplateModel('popup.wrapper', options.popupTemplateUrl, renderTemplateCallback, destroyTemplateCallback),
                            header: new RenderTemplateModel('popup.header', options.popupHeaderTemplateUrl, renderTemplateCallback),
                            container: new RenderTemplateModel('popup.container', undefined, renderTemplateCallback),
                            footer: new RenderTemplateModel('popup.footer', options.popupFooterTemplateUrl, renderTemplateCallback)
                        },
                        suggestedPopup: {
                            wrapper: new RenderTemplateModel('suggestedPopup.wrapper', options.suggestedPopupTemplateUrl, renderTemplateCallback, destroyTemplateCallback),
                            header: new RenderTemplateModel('suggestedPopup.header', options.suggestedPopupHeaderTemplateUrl, renderTemplateCallback),
                            container: new RenderTemplateModel('suggestedPopup.container', undefined, renderTemplateCallback),
                            footer: new RenderTemplateModel('suggestedPopup.footer', options.suggestedPopupFooterTemplateUrl, renderTemplateCallback)
                        },
                        dataSet: {
                            header: new RenderTemplateModel('dataSet.header', options.dataSetsHeaderTemplateUrl, renderTemplateCallback),
                            item: new RenderTemplateModel('dataSet.item', options.dataSetsItemTemplateUrl, renderTemplateCallback),
                            footer: new RenderTemplateModel('dataSet.footer', options.dataSetsFooterTemplateUrl, renderTemplateCallback)
                        }
                    };

                    if (options.popupAppendTo) {
                        scope.$templates.popup.wrapper.appendTo = options.popupAppendTo;
                        scope.$templates.suggestedPopup.wrapper.appendTo = options.popupAppendTo;
                    }

                    scope.setDefaultTerm = function (term) {
                        scope.$dataHolder.defaultTerm = term;
                    };

                    if (options.popupStrictWidth) {
                        scope.$templates.popup.wrapper.strictWidth = true;
                        scope.$templates.suggestedPopup.wrapper.strictWidth = true;
                    }

                    scope.$stateHolder = {
                        loader: false,
                        disabled: false,
                        popup: {
                            opened: false,
                            updateIntervalID: undefined
                        },
                        hasSuggestions: false,
                        suggestedPopup: {
                            opened: false,
                            updateIntervalID: undefined
                        }
                    };

                    scope.$dataHolder = {
                        collectedPromises: [],
                        modelValue: null,
                        defaultTerm: attrs.tgTypeaheadDefaultTerm || null
                    };

                    scope.$eventHolder = {
                        onMatchSelected: $parse(scope.tgTypeaheadSelected)
                    };

                    scope.$promisesHolder = {
                        regularCancelPromise: undefined,
                        suggestedCancelPromise: undefined
                    };


                    attrs.$observe('tgTypeaheadDefaultTerm', function(value) {
                        scope.setDefaultTerm(value);
                        scope.$clearTypeahead();
                    });

                    scope.$term = scope.$dataHolder.defaultTerm;

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

                        Utilities.forEach(scope.$dataSets, function (_dataSet) {
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

                        var popupContainer = scope.$findElementInTemplate(scope.$templates.main.wrapper, '.tg-typeahead__suggestions-container');

                        if (popupContainer) {
                            popupContainer.scrollTop();
                        }

                        if ($event) {
                            $event.stopPropagation();
                        }
                    };

                    scope.refreshModel = function (model) {
                        scope.$clear();

                        model = scope.$prepareModel(model);

                        scope.$setModel(model, true);

                        return model;
                    };

                    scope.setDefaultTerm = function (term) {
                        scope.$dataHolder.defaultTerm = term;
                    };

                    scope.$findElementInTemplate = function (tpl, selector) {
                        if (tpl && tpl.element && selector) {
                            return tpl.element.find(selector);
                        }
                    };

                    scope.$openPopup = function () {
                        var popupState = scope.$stateHolder.popup;

                        if (!popupState.opened) {
                            scope.$stateHolder.suggestedPopup.opened = false;
                            popupState.opened = true;

                            scope.selectDataSet(null);
                            scope.$setActiveMatch(null, -1);

                            scope.$updatePopupElement(scope.$templates.popup.wrapper);

                            if (scope.$templates.popup.wrapper.appendTo && !popupState.updateIntervalID) {
                                popupState.updateIntervalID = $interval(function () {
                                    if (popupState.opened) {
                                        scope.$updatePopupElement(scope.$templates.popup.wrapper);
                                    }
                                }, 200);
                            }
                        }
                    };

                    scope.$openSuggestedPopup = function () {
                        var popupState = scope.$stateHolder.suggestedPopup;

                        if (!popupState.opened) {
                            popupState.opened = true;

                            scope.selectDataSet(null);
                            scope.$setActiveMatch(null, -1);

                            scope.$updatePopupElement(scope.$templates.suggestedPopup.wrapper);

                            if (scope.$templates.suggestedPopup.wrapper.appendTo && !popupState.updateIntervalID) {
                                popupState.updateIntervalID = $interval(function () {
                                    if (popupState.opened) {
                                        scope.$updatePopupElement(scope.$templates.suggestedPopup.wrapper);
                                    }
                                }, 200);
                            }
                        }
                    };

                    scope.$closePopup = function () {
                        if (scope.$stateHolder.popup.opened) {
                            var popupState = scope.$stateHolder.popup;

                            popupState.opened = false;

                            if (popupState.updateIntervalID) {
                                $interval.cancel(popupState.updateIntervalID);
                                popupState.updateIntervalID = undefined;
                            }
                        }

                        if (scope.$stateHolder.suggestedPopup.opened) {
                            var popupState = scope.$stateHolder.suggestedPopup;

                            popupState.opened = false;

                            if (popupState.updateIntervalID) {
                                $interval.cancel(popupState.updateIntervalID);
                                popupState.updateIntervalID = undefined;
                            }
                        }

                        scope.$cancelAllRequests();
                    };

                    scope.$updatePopupElement = function (popup) {
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

                    scope.$isDisabled = function () {
                        return !!scope.tgTypeaheadDisabled || scope.$stateHolder.disabled;
                    };

                    scope.$isVisibleInput = function () {
                        return true;
                    };

                    scope.$isFocusedInput = function () {
                        var inputEl = scope.$findElementInTemplate(scope.$templates.main.wrapper, '.tg-typeahead__input');

                        return (inputEl && inputEl.is(":focus"));
                    };

                    scope.$setInputFocus = function () {
                        var inputEl = scope.$findElementInTemplate(scope.$templates.main.wrapper, '.tg-typeahead__input');

                        if (inputEl) {
                            inputEl.focus();
                        }
                    };

                    scope.$getPlaceholder = function () {
                        return options.placeholder || '';
                    };

                    scope.$isVisibleClear = function () {
                        return (options.displayClean && scope.$term);
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
                            Utilities.forEach(collectedPromises, function (promise) {
                                if (promise.hasOwnProperty('cancelRequest')) {
                                    promise.cancelRequest();
                                }
                            });

                            clearCollectedPromises();
                        }

                        Utilities.forEach(scope.$dataSets, function (dataSet) {
                            dataSet.queried.inProgress = false;
                            if (dataSet.suggested) {
                                dataSet.suggested.inProgress = false;
                            }
                        });
                    };

                    scope.$clearTypeahead = function () {
                        scope.$term = scope.$dataHolder.defaultTerm;
                    };

                    scope.$setActiveMatch = function (dataSet, index) {
                        var dataSetSource;

                        Utilities.forEach(scope.$dataSets, function (_dataSet) {
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
                            match: match,
                            $internal: scope
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

                            Utilities.forEach(scope.$dataSets, function (_dataSet) {
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

                            Utilities.forEach(scope.$dataSets, function (dataSet) {
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
                            if (!model || Utilities.isArray(model) || !Utilities.isObject(model)) {
                                model = {};
                            }

                            Utilities.forEach(scope.$dataSets, function (dataSet) {
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
                            scope.$setModelDirty();
                        }

                        if ($setModelValue) {
                            $setModelValue(parentScope, model);
                        }
                    };

                    scope.$setModelDirty = function () {
                        if (ngModelCtrl.$setDirty) {
                            ngModelCtrl.$setDirty(true); // Angular 1.3.3+

                        } else {
                            ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);

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
                                Utilities.forEach(scope.$dataSets, function (dataSet) {
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
                                    if (activeDataSet && dataSetSource.activeIndex !== -1) {
                                        var match = dataSetSource.matches[dataSetSource.activeIndex];

                                        if (!match.disabled) {
                                            scope.$selectMatch(activeDataSet, dataSetSource.activeIndex, dataSetSource.matches[dataSetSource.activeIndex], evt);
                                            scope.$apply();
                                        }
                                    }
                                } else if (evt.which === 27) { // Esc Key
                                    scope.$clearTypeahead();
                                    scope.$closePopup();
                                    scope.$digest();
                                }
                            }
                        }
                    };

                    scope.$watchModel = function () {
                        scope.$watch(scope.$getModel, function (model) {
                            if (model !== scope.$dataHolder.modelValue) {
                                scope.refreshModel(model);
                            }
                        });
                    };

                    scope.$trigger = selfCtrl.trigger.bind(selfCtrl);

                    /*
                     * private methods
                     */
                    function collectSources(searchTerm) {
                        var collectedPromises = scope.$dataHolder.collectedPromises,
                            rcp = scope.$promisesHolder.regularCancelPromise;

                        if (rcp) {
                            collectedPromises.push(rcp.promise);
                        }

                        Utilities.forEach(scope.$dataSets, function (dataSet) {
                            dataSet.data = {};

                            var sourceLocals = {
                                    $queried: true,
                                    $viewValue: searchTerm,
                                    $internal: scope,
                                    $context: angular.extend({
                                        dataSet: dataSet
                                    }, scope.$prepareSourceContext() || {})
                                },
                                defer = $q.defer();

                            var sourceModel = dataSet.queried,
                                sourceMapper = sourceModel.source.sourceMapper,
                                sourceResult = sourceMapper(parentScope, sourceLocals),
                                promise = (Utilities.isPromise(sourceResult)) ? sourceResult : $q.when(sourceResult);

                            sourceModel.inProgress = true;

                            promise
                                .then(function (response) {
                                    if (scope.$term === searchTerm) {
                                        sourceModel.matches.length = 0;
                                        sourceModel.$hideMore();

                                        var matches = response;

                                        Utilities.forEach(matches, function (match) {
                                            var item = sourceModel.$getItem(match, parentScope),
                                                matchObj = new MatchModel(match, item.model, item.value);

                                            scope.$prepareMatchModel(matchObj, dataSet);

                                            sourceModel.matches.push(matchObj);
                                        });
                                    }

                                    defer.resolve(response);
                                }, function () {
                                    defer.resolve([]);
                                })
                                .finally(function () {
                                    if (rcp) {
                                        rcp.resolve();
                                    }
                                });

                            collectedPromises.push(defer.promise);
                        });

                        return collectedPromises;
                    }

                    function collectSuggestedSources() {
                        var collectedPromises = scope.$dataHolder.collectedPromises,
                            scp = scope.$promisesHolder.suggestedCancelPromise;

                        if (scp) {
                            collectedPromises.push(scp.promise);
                        }

                        Utilities.forEach(scope.$dataSets, function (dataSet) {
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
                                promise = (Utilities.isPromise(sourceResult)) ? sourceResult : $q.when(sourceResult);

                            promise
                                .then(function (response) {
                                    sourceModel.matches.length = 0;
                                    sourceModel.$hideMore();

                                    var matches = response;

                                    Utilities.forEach(matches, function (match) {
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
                            tpl;

                        if (popupOpened) {
                            tpl = scope.$templates.popup.wrapper;
                        } else if (suggestedPopupOpened) {
                            tpl = scope.$templates.suggestedPopup.wrapper;
                        }

                        if (tpl) {
                            var popupContainer = scope.$findElementInTemplate(tpl, '.tg-typeahead__suggestions-container'),
                                _popupContainer = popupContainer.get(0);

                            if (_popupContainer) {
                                if (_popupContainer.clientHeight < _popupContainer.scrollHeight) {
                                    var activeItem = scope.$findElementInTemplate(tpl, '.tg-typeahead__suggestions-group-item.active'),
                                        _activeItem = activeItem.get(0);

                                    if (_activeItem) {
                                        var cpx = _popupContainer.getBoundingClientRect(),
                                            cix = _activeItem.getBoundingClientRect();

                                        if (cix.top < cpx.top) {
                                            _popupContainer.scrollTop += (cix.top - cpx.top);
                                        } else if (cix.bottom > cpx.bottom) {
                                            _popupContainer.scrollTop += (cix.bottom - cpx.bottom);
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

                    function detachEventsToMatchedItems(element) {
                        element
                            .off('mouseenter mouseleave mousedown', '.tg-typeahead__suggestions-group-item');
                    }

                    function renderTemplateCallback(tpl) {
                        selfCtrl.trigger('onTemplateInit', {template: tpl});

                        switch (tpl.name) {
                            case 'main.container':
                                renderMainContainer(tpl);
                                break;
                            case 'popup.wrapper':
                            case 'suggestedPopup.wrapper':
                                attachEventsToMatchedItems(tpl.element);
                                break;
                        }
                    }

                    function destroyTemplateCallback(tpl) {
                        selfCtrl.trigger('onTemplateDestroy', {template: tpl});

                        switch (tpl.name) {
                            case 'popup.wrapper':
                            case 'suggestedPopup.wrapper':
                                detachEventsToMatchedItems(tpl.element);
                                break;
                        }
                    }

                    function renderMainContainer(tpl) {
                        var inputEl = scope.$findElementInTemplate(scope.$templates.main.wrapper, '.tg-typeahead__input');

                        if (inputEl) {
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

                                if (val.length >= options.minLength) {
                                    timeoutPromise = $timeout(function () {
                                        if (scope.$term) {
                                            scope.$resolveSources(val);
                                        }
                                    }, options.delay);
                                }

                                return val;
                            });
                        }
                    }
                }

                function postLink(scope, element, attrs, controllers) {
                    element.append($compile('<div tg-component-render-template="$templates.main.wrapper"></div>')(scope));

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
                        },
                        onDocumentKeydown = function (evt) {
                            scope.$onKeyDown(evt);
                        };

                    $document.on('click', onDocumentClick);
                    $document.on('keydown', onDocumentKeydown);

                    scope.$on('$destroy', function () {
                        scope.$onOutsideClick();

                        Utilities.forEach(scope.$templates, function (tplType) {
                            if (tplType) {
                                Utilities.forEach(tplType, function (tpl) {
                                    if (tpl && tpl.appendTo && tpl.element) {
                                        tpl.element.remove();
                                    }
                                });
                            }
                        });

                        $document.off('click', onDocumentClick);
                        $document.off('keydown', onDocumentKeydown);
                    });

                    scope.$watchModel();
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

                this.refreshModel = function (model) {
                    $scope.refreshModel(model);
                };

                this.getContext = function () {
                    return $scope.tgTypeaheadContext;
                };

                this.getDataSets = function () {
                    return $scope.$dataSets;
                };

                this.setDefaultTerm = function (term) {
                    $scope.setDefaultTerm(term);
                };

                $tgComponents.$addInstance(self);

                $scope.$on('$destroy', function () {
                    $tgComponents.$removeInstance(self);
                });
            }]
        };
    }

    /*
     * TYPE-AHEAD DATA-SET
     */
    tgTypeaheadDataSet.$inject = ['$injector', '$parse'];

    function tgTypeaheadDataSet($injector, $parse) {
        return {
            restrict: 'A',
            require: '^tgTypeahead',
            scope: {
                tgTypeaheadDataSet: '@',
                tgTypeaheadDataSetName: '@',
                tgTypeaheadDataSetLimitStep: '@',
                tgTypeaheadDataSetDisplayedItems: '@',
                tgTypeaheadDataSetSuggested: '@',
                tgTypeaheadDataSetComparator: '&'
            },
            compile: function (tElement, tAttrs) {
                var SOURCE_EXPR = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

                var Utilities = $injector.get('tgUtilities');

                function sourceExprParse(expression) {
                    var match = expression.match(SOURCE_EXPR);

                    if (!match) {
                        throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_' but got '" + expression + "'.");
                    }

                    return {
                        expression: expression,
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
                        DataSetModel = $injector.get('tgTypeaheadDataSetModel'),
                        RenderTemplateModel = $injector.get('tgComponentRenderTemplateModel'),
                        SourceModel = $injector.get('tgTypeaheadSourceModel');

                    var name = scope.tgTypeaheadDataSetName || ('dataSet_' + scope.$id);

                    scope.$dataSet = new DataSetModel(name);

                    scope.$dataSet.templates = {
                        header: new RenderTemplateModel('dataSet.header', attrs.tgTypeaheadDataSetHeaderTemplateUrl),
                        item: new RenderTemplateModel('dataSet.item', attrs.tgTypeaheadDataSetItemTemplateUrl),
                        footer: new RenderTemplateModel('dataSet.footer', attrs.tgTypeaheadDataSetFooterTemplateUrl)
                    };

                    scope.$dataSet.queried = new SourceModel(querySource, displayedItems, limitStep);

                    if (scope.tgTypeaheadDataSetSuggested) {
                        var suggestSource = {
                            itemName: querySource.itemName,
                            sourceMapper: $parse(scope.tgTypeaheadDataSetSuggested),
                            viewMapper: querySource.viewMapper,
                            modelMapper: querySource.modelMapper
                        };

                        scope.$dataSet.suggested = new SourceModel(suggestSource, displayedItems, limitStep);
                    }

                    var comparator = scope.tgTypeaheadDataSetComparator();

                    if (Utilities.isFunction(comparator)) {
                        scope.$dataSet.comparator = comparator;
                    }

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

    /*
     * TYPE-AHEAD EXTENSIONS
     */
    tgTypeaheadTagManager.$inject = ['$injector', '$parse', '$q', '$timeout'];

    function tgTypeaheadTagManager($injector, $parse, $q, $timeout) {
        return {
            restrict: 'A',
            require: ['tgTypeahead', '?ngModel'],
            scope: false,
            priority: 3,
            compile: function (tElement, tAttrs) {
                var RenderTemplateModel = $injector.get('tgComponentRenderTemplateModel'),
                    MatchModel = $injector.get('tgTypeaheadMatchModel'),
                    TagModel = $injector.get('tgTypeaheadTagModel'),
                    Utilities = $injector.get('tgUtilities');

                function prepareOptions(obj, scope, attrs) {
                    var options = {};

                    if (attrs.tgTypeaheadAllowDuplicates) {
                        options.allowDuplicates = (attrs.tgTypeaheadAllowDuplicates === 'true');
                    } else {
                        options.allowDuplicates = obj && obj.allowDuplicates || false;
                    }

                    if (attrs.tgTypeaheadPostponedSelection) {
                        options.postponedSelection = (attrs.tgTypeaheadPostponedSelection === 'true');
                    } else {
                        options.postponedSelection = obj && obj.postponedSelection || false;
                    }

                    if (attrs.tgTypeaheadTagOrderBy) {
                        options.orderBy = $parse(attrs.tgTypeaheadTagOrderBy)(scope);
                    } else {
                        options.orderBy = obj && obj.orderBy || undefined;
                    }

                    if (attrs.tgTypeaheadTagAscendingOrder) {
                        options.ascendingOrder = (attrs.tgTypeaheadTagAscendingOrder === 'true');
                    } else {
                        options.ascendingOrder = obj && obj.ascendingOrder || false;
                    }

                    if (attrs.tgTypeaheadMaxLines) {
                        options.maxLines = Math.abs(parseInt(attrs.tgTypeaheadMaxLines));
                    } else {
                        options.maxLines = obj && obj.maxLines || 0;
                    }

                    if (attrs.tgTypeaheadMaxSelectedTags) {
                        options.maxSelectedTags = Math.abs(parseInt(attrs.tgTypeaheadMaxSelectedTags))
                    } else {
                        options.maxSelectedTags = obj && obj.maxSelectedTags || 0;
                    }

                    if (attrs.tgTypeaheadDisplayClean) {
                        options.displayClean = (attrs.tgTypeaheadDisplayClean === 'true');
                    } else {
                        options.displayClean = obj && obj.displayClean || false;
                    }

                    if (attrs.tgTypeaheadTagsTransform) {
                        options.tagsTransform = (attrs.tgTypeaheadTagsTransform === 'true');
                    } else {
                        options.tagsTransform = obj && obj.tagsTransform || false;
                    }

                    if (attrs.tgTypeaheadTagManagerTemplateUrl) {
                        options.tagManagerTemplateUrl = attrs.tgTypeaheadTagManagerTemplateUrl;
                    } else {
                        options.tagManagerTemplateUrl = obj && obj.tagManagerTemplateUrl || 'tg-typeahead-tag-manager.tpl.html';
                    }

                    if (attrs.tgTypeaheadTagTemplateUrl) {
                        options.tagTemplateUrl = attrs.tgTypeaheadTagTemplateUrl;
                    } else {
                        options.tagTemplateUrl = obj && obj.tagTemplateUrl || 'tg-typeahead-tag.tpl.html';
                    }

                    if (attrs.tgTypeaheadMultiselection) {
                        options.multiSelection = (attrs.tgTypeaheadMultiselection !== 'false');
                    } else {
                        options.multiSelection = !obj || obj.multiSelection !== false;
                    }

                    return options;
                }

                function preLink(scope, element, attrs, controllers) {
                    var tgTypeaheadCtrl = controllers[0],
                        ngModelCtrl = controllers[1],
                        uspTimeoutPromise;

                    scope = tgTypeaheadCtrl.$scope;

                    var parentScope = scope.$parent;

                    var options = prepareOptions($parse(attrs.tgTypeaheadTagManager)(parentScope), parentScope, attrs);

                    scope.$tags = [];
                    scope.$tagsOrder = function () {
                        return 0;
                    };

                    if (options.orderBy) {
                        scope.$tagsOrder = options.orderBy;
                    } else if (options.ascendingOrder) {
                        scope.$tagsOrder = ['match.value'];
                    }

                    // Set Templates
                    scope.$templates.tagManager = {
                        wrapper: new RenderTemplateModel('tagManager.wrapper', options.tagManagerTemplateUrl),
                        tag: new RenderTemplateModel('tagManager.tag', options.tagTemplateUrl)
                    };

                    scope.$templates.tagManager.wrapper.style = {};

                    scope.$templates.main.header = scope.$templates.tagManager.wrapper;

                    scope.$stateHolder = angular.extend(scope.$stateHolder || {}, {
                        tagsTransformed: false
                    });

                    scope.$eventHolder = angular.extend(scope.$eventHolder || {}, {
                        onTagSelected: $parse(attrs.tgTypeaheadTagSelected),
                        onTagDeselected: $parse(attrs.tgTypeaheadTagDeselected),
                        onApplySelection: $parse(attrs.tgTypeaheadApplySelection)
                    });

                    // internal functionality
                    scope.$getTagsText = function () {
                        return Utilities.select(scope.$tags, function (tag) {
                            return tag.match.value;
                        }).join(', ');
                    };

                    scope.$canAddTag = function () {
                        return (options.maxSelectedTags === 0 || options.maxSelectedTags > scope.$tags.length);
                    };

                    scope.$addMatchedTag = function (data, dataSet, isSuggested) {
                        if (!dataSet && scope.$dataSets.length) {
                            dataSet = scope.$dataSets[0];
                        }

                        if (dataSet) {
                            var source = (isSuggested) ? dataSet.suggested : dataSet.queried,
                                match = source.$getItem(data, parentScope),
                                tag = new TagModel(match, dataSet.build());

                            scope.$addTag(tag);
                        }

                        scope.$closePopup();
                    };

                    scope.$addTag = function (tag, sender) {
                        if (tag && tag.match && scope.$canAddTag()) {
                            var evt = {
                                context: scope.tgTypeaheadContext,
                                tag: tag,
                                sender: sender || 'Control',
                                $internal: scope
                            };

                            return tgTypeaheadCtrl.events
                                .emit('onTagAdding', evt)
                                .then(function () {
                                    var idx;

                                    if (tag.dataSet) {
                                        var model = scope.$getModel(),
                                            src = model;

                                        if (src) {
                                            if (scope.$dataSets.length > 1) {
                                                src = src[tag.dataSet.name];
                                            }

                                            idx = -1;

                                            if (!options.allowDuplicates) {
                                                // check if match model already exist in model
                                                idx = Utilities.each(src, function (it, i) {
                                                    if (tag.dataSet.comparator(it, tag.match.model)) {
                                                        return i;
                                                    }
                                                }, -1);
                                            }

                                            if (idx === -1) {
                                                src.push(tag.match.model);
                                                scope.$setModelDirty();
                                            }
                                        }
                                    }

                                    idx = -1;

                                    if (!options.allowDuplicates) {
                                        idx = Utilities.each(scope.$tags, function (t, i) {
                                            if (t.dataSet.comparator(t.match.model, tag.match.model)) {
                                                return i;
                                            }
                                        }, -1);
                                    }

                                    if (idx === -1) {
                                        scope.$tags.push(tag);

                                        if (uspTimeoutPromise) {
                                            $timeout.cancel(uspTimeoutPromise);
                                        }

                                        uspTimeoutPromise = $timeout(function () {
                                            updateTagManagerScrollPosition();
                                        }, 50);

                                        tgTypeaheadCtrl.events.emit('onTagAdded', evt);

                                        scope.$eventHolder.onTagSelected(parentScope, evt);

                                        return tag;
                                    }
                                });
                        }

                        return $q.when(undefined);
                    };

                    scope.$removeTag = function (tag, sender) {
                        var idx = scope.$tags.indexOf(tag);

                        if (idx !== -1) {
                            var evt = {
                                context: scope.tgTypeaheadContext,
                                index: idx,
                                tag: tag,
                                sender: sender || 'Control',
                                $internal: scope
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
                                            idx = Utilities.each(src, function (it, i) {
                                                if (tag.dataSet.comparator(it, tag.match.model)) {
                                                    return i;
                                                }
                                            }, -1);

                                            if (idx !== -1) {
                                                src.splice(idx, 1);
                                                scope.$setModelDirty();
                                            }
                                        }
                                    }

                                    idx = scope.$tags.indexOf(tag);

                                    if (idx !== -1) {
                                        scope.$tags.splice(idx, 1);
                                        tgTypeaheadCtrl.events.emit('onTagRemoved', evt);
                                        scope.$eventHolder.onTagDeselected(parentScope, evt);
                                    }
                                });
                        }

                        return $q.when(false);
                    };

                    scope.$findTag = function (match) {
                        return Utilities.each(scope.$tags, function (tag) {
                            if (tag.dataSet.comparator(tag.match.model, match.model)) {
                                return tag;
                            }
                        });
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
                            Utilities.forEach(dataSetSource.matches, function (match, index) {
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
                            Utilities.forEach(dataSetSource.matches, function (match, index) {
                                if (match.selected) {
                                    scope.$selectMatch(dataSet, index, match, $event);
                                }
                            });
                        }
                    };

                    scope.applySelections = function (dataSets) {
                        var promises = [];

                        Utilities.forEach(dataSets, function (dataSet) {
                            var dataSetSource = scope.getDataSetSource(dataSet);

                            if (dataSetSource) {
                                Utilities.forEach(dataSetSource.matches, function (match) {
                                    var tag = scope.$findTag(match),
                                        promise;

                                    if (match.selected) {
                                        if (tag === undefined) {
                                            tag = new TagModel(match, dataSet.build());

                                            promise = scope.$addTag(tag);
                                        }
                                    } else {
                                        var tag = scope.$findTag(match);

                                        if (tag !== undefined) {
                                            promise = scope.$removeTag(tag);
                                        }
                                    }

                                    if (promise) {
                                        promises.push(promise);
                                    }
                                });
                            }
                        });

                        $q.all(promises)
                            .then(function () {
                                var evt = {
                                    context: scope.tgTypeaheadContext,
                                    $internal: scope
                                };

                                tgTypeaheadCtrl.events.emit('onApplySelection', evt);

                                scope.$eventHolder.onApplySelection(parentScope, evt);
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
                            if (options.maxSelectedTags > 0 && options.maxSelectedTags <= scope.$tags.length) {
                                result = false;
                            }
                        }

                        if (result) {
                            scope.$updateInputElement();
                        }

                        return result;
                    });

                    tgTypeaheadCtrl.$overrideFn('$isVisibleClear', function () {
                        return (options.displayClean && scope.$tags.length > 1);
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
                                if (!options.postponedSelection) {
                                    var tag = scope.$findTag(match);

                                    // multi selection: select / deselect
                                    if (tag === undefined || options.allowDuplicates) {
                                        tag = new TagModel(match, dataSet.build());

                                        scope.$addTag(tag);

                                        match.selected = true;
                                    } else {
                                        scope.$removeTag(tag);

                                        match.selected = false;
                                    }
                                } else {
                                    match.selected = !match.selected;
                                }

                                if (!options.postponedSelection &&
                                    (!options.multiSelection || !$event || !($event.ctrlKey | $event.metaKey))) {
                                    scope.$onOutsideClick();
                                }
                            });
                    });

                    tgTypeaheadCtrl.$overrideFn('$watchModel', function () {
                        //this.$baseFn();

                        var len = scope.$dataSets.length,
                            multiple = (len > 1);

                        var fnUpdateTagsList = function (dataSet, model) {
                            var sourceModel = dataSet.queried,
                                addTags = [],
                                removeTags = [];

                            // collect tags which should be added
                            Utilities.forEach(model, function (it) {
                                var matchedTag = Utilities.each(scope.$tags, function (tag) {
                                    if (tag.dataSet.name === dataSet.name &&
                                        tag.dataSet.comparator(tag.match.model, it)) {
                                        return tag;
                                    }
                                });

                                if (!matchedTag) {
                                    var item = sourceModel.$getItem(it, scope.$parent),
                                        match = new MatchModel(it, item.model, item.value),
                                        tag = new TagModel(match, dataSet.build());

                                    addTags.push(tag);
                                }
                            });

                            // collect tags which should be removed
                            Utilities.forEach(scope.$tags, function (tag) {
                                if (tag.dataSet.name === dataSet.name) {
                                    var matchedItem = Utilities.each(model, function (it) {
                                        if (tag.dataSet.comparator(tag.match.model, it)) {
                                            return it;
                                        }
                                    });

                                    if (!matchedItem) {
                                        removeTags.push(tag);
                                    }
                                }
                            });

                            Utilities.forEach(removeTags, function (tag) {
                                scope.$removeTag(tag, 'ModelUpdate');
                            });

                            Utilities.forEach(addTags, function (tag) {
                                scope.$addTag(tag, 'ModelUpdate');
                            });
                        };

                        Utilities.forEach(scope.$dataSets, function (dataSet) {
                            var fnGetModel = function () {
                                var model = scope.$getModel();

                                if (model && multiple) {
                                    return model[dataSet.name];
                                }

                                return model;
                            };

                            scope.$watchCollection(fnGetModel, function (model) {
                                if (!Utilities.isArray(model)) {
                                    if (multiple) {
                                        var baseModel = scope.$getModel();

                                        if (baseModel) {
                                            baseModel[dataSet.name] = [];
                                        } else {
                                            baseModel = scope.$prepareDefaultModel();
                                            scope.$setModel(baseModel, true);
                                        }
                                    } else {
                                        scope.$setModel([], true);
                                    }
                                } else {
                                    fnUpdateTagsList(dataSet, model);
                                }
                            });
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

                            Utilities.forEach(scope.$dataSets, function (dataSet) {
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
                            if (!model || Utilities.isArray(model) || !Utilities.isObject(model)) {
                                model = {};
                            }

                            Utilities.forEach(scope.$dataSets, function (dataSet) {
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
                            Utilities.forEach(activeSources, function (activeSource) {
                                var dataSet = activeSource.dataSet,
                                    sourceModel = dataSet.queried;

                                Utilities.forEach(activeSource.source, function (match) {
                                    var item = sourceModel.$getItem(match, scope.$parent),
                                        match = new MatchModel(match, item.model, item.value),
                                        tag = new TagModel(match, dataSet.build());

                                    scope.$addTag(tag, 'ModelUpdate');
                                });
                            });
                        }

                        return model;
                    });

                    tgTypeaheadCtrl.$overrideFn('$prepareMatchModel', function (matchModel, dataSet) {
                        if (!options.allowDuplicates && scope.$tags.length > 0) {
                            var tag = scope.$findTag(matchModel);

                            if (tag !== undefined) {
                                matchModel.selected = true;
                            }
                        }
                    });

                    tgTypeaheadCtrl.$overrideFn('$updateInputElement', function () {
                        adjustInputElWidth();

                        if (options.maxLines > 0) {
                            if (scope.$tags.length > 1) {
                                scope.$templates.tagManager.wrapper.class = 'clearfix';
                                scope.$templates.tagManager.wrapper.style['max-height'] = (22 * options.maxLines) + 'px';
                                scope.$templates.tagManager.wrapper.style['overflow-y'] = 'auto';
                            } else {
                                scope.$templates.tagManager.wrapper.class = undefined;
                                scope.$templates.tagManager.wrapper.style['max-height'] = undefined;
                                scope.$templates.tagManager.wrapper.style['overflow-y'] = undefined;
                            }
                        }
                    });

                    /**
                     * tgTypeahead controller additional methods
                     */
                    tgTypeaheadCtrl.getTags = function () {
                        var tags = [];

                        Utilities.forEach(scope.$tags, function (tag) {
                            tags.push(tag);
                        });

                        return tags;
                    };

                    tgTypeaheadCtrl.addTag = function (match, dataSet) {
                        var tag = new TagModel(match, dataSet.build());

                        return scope.$addTag(tag);
                    };

                    tgTypeaheadCtrl.removeTag = function (tag) {
                        return scope.$removeTag(tag);
                    };

                    tgTypeaheadCtrl.clearTags = function () {
                        scope.$clearTags();
                    };

                    tgTypeaheadCtrl.switchToText = function () {
                        scope.$stateHolder.tagsTransformed = true;
                    };

                    tgTypeaheadCtrl.switchToTags = function () {
                        scope.$stateHolder.tagsTransformed = false;

                        $timeout(function () {
                            scope.$setInputFocus();
                            updateTagManagerScrollPosition();
                        });
                    };

                    tgTypeaheadCtrl.updateTagsOrder = function () {
                        var model = scope.$getModel();

                        if (model) {
                            var multiple = (scope.$dataSets.length > 1);

                            Utilities.sort(scope.$tags, function (tag1, tag2) {
                                var src = model;

                                // if there are multiple data-sets, then get specific data-set model
                                if (multiple) {
                                    src = model[tag1.dataSet.name];
                                }

                                // get first tag position in model
                                var tag1Idx = Utilities.each(src, function (it, idx) {
                                    if (tag1.dataSet.comparator(tag1.match.model, it)) {
                                        return idx;
                                    }
                                }, 0);

                                // if there are different data-sets for tags
                                if (multiple && tag1.dataSet.name !== tag2.dataSet.name) {
                                    src = model[tag2.dataSet.name];
                                }

                                // get second tag position in model
                                var tag2Idx = Utilities.each(src, function (it, idx) {
                                    if (tag2.dataSet.comparator(tag2.match.model, it)) {
                                        return idx;
                                    }
                                }, 0);

                                return tag1Idx - tag2Idx;
                            });
                        }
                    };

                    /**
                     * watches
                     */
                    scope.$watchCollection('$tags', function () {
                        updateValidity();
                    });

                    attrs.$observe('required', function () {
                        updateValidity();
                    });

                    /*
                     * private methods
                     */
                    function updateValidity() {
                        if (ngModelCtrl) {
                            $timeout(function () {
                                if (!!attrs.required) {
                                    ngModelCtrl.$setValidity('tagsRequired', (scope.$tags.length !== 0));
                                } else {
                                    ngModelCtrl.$setValidity('tagsRequired', true);
                                }
                            });
                        }
                    }

                    function adjustInputElWidth() {
                        var mainWrapperEl = scope.$templates.main.wrapper,
                            inputContainerEl = scope.$findElementInTemplate(mainWrapperEl, '.tg-typeahead__input-container'),
                            inputEl = scope.$findElementInTemplate(mainWrapperEl, '.tg-typeahead__input');

                        if (inputContainerEl && inputEl) {
                            if (scope.$tags.length === 1) {
                                var maxWidth = element.width(),
                                    listWidth = (function () {
                                        var bottomRowWidth = 0,
                                            tagEl, tagWidth;

                                        var tagsEls = scope.$findElementInTemplate(scope.$templates.tagManager.wrapper, '.tg-typeahead__tag');

                                        if (tagsEls) {
                                            tagsEls.each(function () {
                                                tagEl = angular.element(this);
                                                tagWidth = tagEl.outerWidth() + (parseInt(tagEl.css('margin-left')) || 0) + (parseInt(tagEl.css('margin-right')) || 0);
                                                bottomRowWidth += tagWidth;

                                                if (bottomRowWidth > maxWidth) {
                                                    bottomRowWidth = tagWidth;
                                                }
                                            });
                                        }

                                        return bottomRowWidth;
                                    }());

                                if (listWidth > 0) {
                                    var diff = maxWidth - listWidth,
                                        queryInputWidth = (diff < 100) ? maxWidth : diff;

                                    if (queryInputWidth >= 9) {
                                        queryInputWidth -= 9;
                                    }

                                    inputContainerEl.css('width', queryInputWidth + 'px');
                                    return;
                                }
                            }

                            inputContainerEl.css('width', '100%');
                        }
                    }

                    function updateTagManagerScrollPosition() {
                        var tagManagerContainerEl = scope.$findElementInTemplate(scope.$templates.tagManager.wrapper, '.tg-typeahead__tag-manager');

                        if (tagManagerContainerEl) {
                            var _tagManagerContainerEl = tagManagerContainerEl.get(0);

                            if (_tagManagerContainerEl) {
                                tagManagerContainerEl.scrollTop(_tagManagerContainerEl.scrollHeight);
                            }
                        }
                    }
                }

                return {
                    pre: preLink,
                    post: undefined
                };
            }
        };
    }

    tgTypeaheadFilterManager.$inject = ['$injector', '$q'];

    function tgTypeaheadFilterManager($injector, $q) {
        return {
            restrict: 'A',
            require: ['tgTypeahead'],
            scope: false,
            priority: 2,
            compile: function (tElement, tAttrs) {
                var maxUsedFilters = parseInt(tAttrs.tgTypeaheadMaxUsedFilters) || 0,
                    RenderTemplateModel = $injector.get('tgComponentRenderTemplateModel'),
                    FilterTagModel = $injector.get('tgTypeaheadFilterTagModel');

                function preLink(scope, element, attrs, controllers) {
                    var tgTypeaheadCtrl = controllers[0];

                    scope = tgTypeaheadCtrl.$scope;

                    // Set Templates
                    scope.$templates.filterManager = {
                        wrapper: new RenderTemplateModel('filterManager.wrapper', attrs.tgTypeaheadFilterManagerTemplateUrl || 'tg-typeahead-filter-manager.tpl.html'),
                        tag: new RenderTemplateModel('filterManager.tag', attrs.tgTypeaheadFilterTagTemplateUrl || 'tg-typeahead-filter-tag.tpl.html')
                    };

                    scope.$templates.main.header = scope.$templates.filterManager.wrapper;

                    scope.$filters = {
                        tags: [],
                        active: null
                    };

                    // internal functionality
                    scope.initFilterManager = function () {
                        scope.clearFilterTags();
                        scope.$clearTypeahead();

                        scope.addFilterTag(new FilterTagModel(null))
                            .then(function (filterTag) {
                                scope.$filters.active = filterTag;
                            });
                    };

                    scope.canAddFilterTag = function () {
                        return (maxUsedFilters === 0 || maxUsedFilters > scope.$filters.tags.length);
                    };

                    scope.addFilterTag = function (filterTag) {
                        if (filterTag && !filterTag.match && scope.canAddFilterTag()) {
                            var evt = {
                                context: scope.tgTypeaheadContext,
                                filterTag: filterTag
                            };

                            return tgTypeaheadCtrl.events.emit('onFilterTagAdding', evt)
                                .then(function () {
                                    scope.$filters.tags.push(filterTag);

                                    tgTypeaheadCtrl.events.emit('onFilterTagAdded', evt);

                                    return filterTag;
                                });
                        }

                        return $q.when(undefined);
                    };

                    scope.removeFilterTag = function (filterTag) {
                        var idx = scope.$filters.tags.indexOf(filterTag);

                        if (idx !== -1) {
                            var evt = {
                                context: scope.tgTypeaheadContext,
                                filterTag: filterTag
                            };

                            return tgTypeaheadCtrl.events.emit('onFilterTagRemoving', evt)
                                .then(function () {
                                    scope.$filters.tags.splice(idx, 1);

                                    scope.selectFilterMatch(null, filterTag);

                                    tgTypeaheadCtrl.events.emit('onFilterTagRemoved', evt);

                                    return true;
                                });
                        }

                        return $q.when(false);
                    };

                    scope.clearFilterTags = function () {
                        scope.$filters.tags.length = 0;
                    };

                    scope.selectFilterMatch = function (match, filterTag) {
                        filterTag = filterTag || scope.$filters.active;

                        if (filterTag) {
                            filterTag.match = match;

                            var lastFilterTag = null,
                                len = scope.$filters.tags.length;

                            if (len > 0) {
                                lastFilterTag = scope.$filters.tags[len - 1];
                            }

                            if (!lastFilterTag || lastFilterTag.match) {
                                scope.addFilterTag(new FilterTagModel(null))
                                    .then(function (newFilterTag) {
                                        scope.$filters.active = newFilterTag;
                                    });
                            }
                        }

                        scope.$clearTypeahead();
                        scope.$closePopup();
                    };

                    scope.getAppliedFilters = function () {
                        var filters = [];

                        scope.$filters.tags.forEach(function (filterTag) {
                            if (filterTag.filter && filterTag.match) {
                                filters.push({
                                    type: filterTag.filter.type,
                                    value: filterTag.match,
                                    tag: filterTag
                                });
                            }
                        });

                        return filters;
                    };

                    scope.$onFilterTypeSelect = function (filterTag, filter) {
                        var evt = {
                            context: scope.tgTypeaheadContext,
                            filterTag: filterTag,
                            filter: filter
                        };

                        return tgTypeaheadCtrl.events.emit('onFilterTypeSelecting', evt)
                            .then(function () {
                                tgTypeaheadCtrl.events.emit('onFilterTypeSelected', evt);
                            });
                    };

                    /**
                     * tgTypeahead methods overrides
                     */
                    tgTypeaheadCtrl.$overrideFn('$prepareSourceContext', function (locals) {
                        return {
                            filters: scope.getAppliedFilters(),
                            currentFilter: scope.$filters.active
                        };
                    });

                    /**
                     * tgTypeaheadTagManager methods overrides
                     */
                    tgTypeaheadCtrl.$overrideFn('$isVisibleInput', function () {
                        var result = this.$baseFn(),
                            count = 0;

                        if (result) {
                            scope.$filters.tags.forEach(function (filterTag) {
                                if (filterTag.match) {
                                    count++;
                                }
                            });

                            if (maxUsedFilters > 0 && maxUsedFilters <= count) {
                                result = false;
                            }
                        }

                        if (result) {
                            scope.$updateInputElement();
                        }

                        return result;
                    });

                    tgTypeaheadCtrl.$overrideFn('$updateInputElement', function () {
                        //adjustInputElWidth();
                    });

                    /**
                     * tgTypeahead events handlers
                     */
                    tgTypeaheadCtrl.events.on('onMatchSelected', function () {
                        scope.initFilterManager();
                    });

                    tgTypeaheadCtrl.initFilterManager = function () {
                        scope.initFilterManager();
                    };

                    tgTypeaheadCtrl.getAppliedFilters = function () {
                        return scope.getAppliedFilters();
                    };

                    tgTypeaheadCtrl.getCurrentFilter = function () {
                        return scope.$filters.active;
                    };

                    tgTypeaheadCtrl.refreshFilters = function () {

                        var unwatch, evt = {
                            context: scope.tgTypeaheadContext,
                            filterTags: scope.$filters.tags
                        };

                        tgTypeaheadCtrl.events.emit('onFilterTagsChange', evt);

                        if (scope.tgTypeaheadDefaultFilter) {
                            unwatch = scope.$watch('$filters.active.filter', function(newVal, oldVal, scope) {
                                if (newVal) {
                                    var activeFilters = scope.$filters.active, defaultFilter;

                                    defaultFilter = activeFilters.filters.filter(function(filter){
                                        return filter.type === scope.tgTypeaheadDefaultFilter;
                                    })[0];

                                    activeFilters.filter = defaultFilter || newVal;
                                    unwatch();
                                }
                            });
                        }
                    };

                    /**
                     * watches
                     */
                    scope.$watchCollection('$filters.tags', function () {
                        tgTypeaheadCtrl.refreshFilters();
                    }, true);

                    /*
                     * private methods
                     */
                    function adjustInputElWidth() {
                        var inputContainerEl = scope.$findElementInTemplate(scope.$templates.main.wrapper, '.tg-typeahead__input-container'),
                            inputEl = scope.$findElementInTemplate(scope.$templates.main.wrapper, '.tg-typeahead__input');

                        if (inputContainerEl && inputEl) {
                            var maxWidth = element.width(),
                                listWidth = (function () {
                                    var bottomRowWidth = 0,
                                        tagEl, tagWidth;

                                    var tagsEls = scope.$findElementInTemplate(scope.$templates.filterManager.wrapper, '.tg-typeahead__tag-wrap');

                                    if (tagsEls) {
                                        tagsEls.each(function () {
                                            tagEl = angular.element(this);
                                            tagWidth = tagEl.outerWidth() + parseInt(tagEl.css('margin-left')) + parseInt(tagEl.css('margin-right'));
                                            bottomRowWidth += tagWidth;

                                            if (bottomRowWidth > maxWidth) {
                                                bottomRowWidth = tagWidth;
                                            }
                                        });
                                    }

                                    return bottomRowWidth;
                                }());

                            if (listWidth > 0) {
                                var diff = maxWidth - listWidth,
                                    queryInputWidth = (diff < 100) ? maxWidth : diff;

                                if (queryInputWidth >= 25) {
                                    queryInputWidth -= 25;
                                }

                                inputContainerEl.css('width', queryInputWidth + 'px');
                                return;
                            }

                            inputContainerEl.css('width', '100%');
                        }
                    }

                    scope.initFilterManager();
                }

                return {
                    pre: preLink,
                    post: undefined
                };
            }
        };
    }

    /*
     * TYPE-AHEAD TEMPLATE PARTS
     */
    tgTypeaheadHeader.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadHeader(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeahead', '$setHeaderTemplate');
    }

    tgTypeaheadFooter.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadFooter(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeahead', '$setFooterTemplate');
    }

    tgTypeaheadPopupHeader.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadPopupHeader(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeahead', '$setPopupHeaderTemplate');
    }

    tgTypeaheadPopupFooter.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadPopupFooter(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeahead', '$setPopupFooterTemplate');
    }

    tgTypeaheadDataSetHeader.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadDataSetHeader(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeaheadDataSet', '$setHeaderTemplate');
    }

    tgTypeaheadDataSetItem.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadDataSetItem(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeaheadDataSet', '$setItemTemplate');
    }

    tgTypeaheadDataSetFooter.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadDataSetFooter(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeaheadDataSet', '$setFooterTemplate');
    }

    tgTypeaheadSuggestedPopupHeader.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadSuggestedPopupHeader(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeahead', '$setSuggestedPopupHeaderTemplate');
    }

    tgTypeaheadSuggestedPopupFooter.$inject = ['tgComponentsTemplate'];

    function tgTypeaheadSuggestedPopupFooter(tgComponentsTemplate) {
        return tgComponentsTemplate.transcludeTemplate('^?tgTypeahead', '$setSuggestedPopupFooterTemplate');
    }

    /*
     * TYPE-AHEAD MODELS
     */
    function tgTypeaheadDataSetModel() {
        function DataSetModelFactory(name) {
            this.name = name;
            this.data = undefined;
            this.templates = undefined;
            this.queried = undefined;
            this.suggested = undefined;
            this.comparator = function (matchA, matchB) {
                return angular.equals(matchA, matchB);
            };
        }

        DataSetModelFactory.prototype.build = function () {
            return {
                name: this.name,
                comparator: this.comparator
            };
        };

        return DataSetModelFactory;
    }

    function tgTypeaheadSourceModel() {
        function SourceModelFactory(source, displayedItems, limitStep) {
            this.source = source;
            this.matches = [];
            this.displayedItems = displayedItems;
            this.limitStep = limitStep;
            this.limit = displayedItems;
            this.active = true;
            this.activeIndex = -1;
            this.inProgress = false;
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
    }

    function tgTypeaheadMatchModel() {
        function MatchModelFactory(data, model, value) {
            this.data = data;
            this.model = model;
            this.value = value;
            this.selected = false;
            this.disabled = false;
        }

        return MatchModelFactory;
    }

    function tgTypeaheadSuggestedMatchModel() {
        function SuggestedMatchModelFactory(data, model, value) {
            this.data = data;
            this.model = model;
            this.value = value;
            this.selected = false;
            this.disabled = false;
            this.suggested = true;
        }

        return SuggestedMatchModelFactory;
    }

    function tgTypeaheadTagModel() {
        function TagModelFactory(match, dataSet) {
            this.match = match;
            this.dataSet = dataSet;
        }

        return TagModelFactory;
    }

    function tgTypeaheadFilterTagModel() {
        function FilterTagModelFactory(match) {
            this.match = match;
            this.filter = undefined;
            this.filters = [];
        }

        return FilterTagModelFactory;
    }
})();
