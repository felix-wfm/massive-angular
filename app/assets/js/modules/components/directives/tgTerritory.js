(function () {
    'use strict';

    angular.module('tg.components')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('tg-territory.tpl.html',
                '<div class="tg-territory">\
                    <div class="tg-territory__input-container">\
                        <input type="text" class="tg-territory__input" />\
                        <button class="tg-territory__open-btn" ng-click="openPopup();">Q</button>\
                    </div>\
                    <div class="tg-territory__popup" ng-if="stateHolder.popup.isOpen">\
                        <div class="tg-territory__popup-header"></div>\
                        <div class="tg-territory__popup-body">\
                            <div class="tg-territory__clusters">\
                                <div class="tg-territory__cluster" ng-repeat="cluster in dataHolder.source.clusters">\
                                    <div class="tg-territory__cluster-inner">\
                                        <div class="tg-territory__cluster-header" ng-click="toggleExpand(cluster);">\
                                            <span class="pull-left">\
                                                <i class="fa" ng-class="expandClass(cluster)"></i>\
                                                {{cluster.title}}\
                                            </span>\
                                            <span class="pull-right">\
                                                {{cluster._selectedTerritoriesIds.length}}/{{cluster._territories.length}}\
                                                <i class="fa" ng-class="clusterSelectionClass(cluster)" ng-click="toggleAllTerritoriesSelection(cluster, $event);"></i>\
                                            </span>\
                                        </div>\
                                        <ul class="tg-territory__cluster-countries" ng-if="cluster._expanded">\
                                            <li class="tg-territory__cluster-country" \
                                                ng-repeat="territory in cluster._territories" \
                                                ng-click="toggleTerritorySelection(cluster, territory);" \
                                                ng-class="{\'m-active\':territory._selected}">\
                                                <span>{{territory.title}}</span>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>');
        }])
        .directive('tgTerritory', ['$tgComponents', '$injector', '$http', '$compile', '$parse', '$q', '$timeout', '$document',
            function ($tgComponents, $injector, $http, $compile, $parse, $q, $timeout, $document) {
                return {
                    restrict: 'A',
                    require: ['tgTerritory', '?ngModel'],
                    scope: {
                        tgTerritory: '@',
                        tgTerritoryId: '@',
                        tgTerritorySource: '='
                    },
                    templateUrl: 'tg-territory.tpl.html',
                    compile: function (tElement, tAttrs) {
                        var $getModelValue = $parse(tAttrs.ngModel),
                            $setModelValue = $getModelValue.assign;

                        function prepareSource(source) {
                            source = angular.copy(source);

                            var countries = source.countries;

                            source.clusters.forEach(function (cluster) {
                                cluster._expanded = false;
                                cluster._territories = [];
                                cluster._selectedTerritoriesIds = [];

                                cluster.territory_ids.forEach(function (territoryId) {
                                    for (var i = 0, n = countries.length; i < n; i++) {
                                        if (countries[i].id === territoryId) {
                                            var territory = angular.copy(countries[i]);

                                            territory._selected = false;

                                            cluster._territories.push(territory);

                                            break;
                                        }
                                    }
                                });
                            });

                            console.log(source);

                            return source;
                        }

                        function preLink(scope, element, attrs, controllers) {
                            var parentScope = scope.$parent,
                                selfCtrl = controllers[0],
                                ngModelCtrl = controllers[1];

                            scope.dataHolder = {
                                source: prepareSource(scope.tgTerritorySource)
                            };

                            scope.stateHolder = {
                                popup: {
                                    isOpen: false
                                }
                            };

                            scope.openPopup = function () {
                                scope.stateHolder.popup.isOpen = true;
                            };

                            scope.onOutsideClick = function () {
                                scope.stateHolder.popup.isOpen = false;
                            };

                            scope.toggleExpand = function (cluster) {
                                cluster._expanded = !cluster._expanded;
                            };

                            scope.expandClass = function (cluster) {
                                return (cluster._expanded) ? 'fa-caret-down' : 'fa-caret-right';
                            };

                            scope.toggleTerritorySelection = function (cluster, territory) {
                                territory._selected = !territory._selected;

                                if (territory._selected) {
                                    cluster._selectedTerritoriesIds.push(territory.id);
                                } else {
                                    var idx = cluster._selectedTerritoriesIds.indexOf(territory.id);

                                    if (idx !== -1) {
                                        cluster._selectedTerritoriesIds.splice(idx, 1);
                                    }
                                }
                            };

                            scope.toggleAllTerritoriesSelection = function (cluster, $event) {
                                $event.stopPropagation();

                                var selectedCount = cluster._selectedTerritoriesIds.length,
                                    selectState = (selectedCount !== cluster._territories.length);

                                cluster._selectedTerritoriesIds.splice(0, cluster._selectedTerritoriesIds.length);

                                cluster._territories.forEach(function (territory) {
                                    territory._selected = selectState;

                                    if (selectState) {
                                        cluster._selectedTerritoriesIds.push(territory.id);
                                    }
                                });
                            };

                            scope.clusterSelectionClass = function (cluster) {
                                var selectedCount = cluster._selectedTerritoriesIds.length;

                                if (selectedCount === cluster._territories.length) {
                                    return 'fa-check-square-o';
                                } else if (selectedCount > 0) {
                                    return 'fa-minus-square-o';
                                }

                                return 'fa-square-o';
                            };
                        }

                        function postLink(scope, element, attrs, controllers) {
                            var onDocumentClick = function (evt) {
                                if (element.has(evt.target).length === 0) {
                                    scope.onOutsideClick();
                                    scope.$digest();
                                }
                            };

                            $document.on('click', onDocumentClick);

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

                        self.$type = 'tgTerritory';
                        self.$name = !$scope.tgTerritoryId ? (self.$type + '_' + $scope.$id) : $scope.tgTerritoryId;
                        self.$scope = $scope;
                        self.$element = $element;
                        self.$attrs = $attrs;
                        self.$supportEvents = true;

                        $tgComponents.$addInstance(self);

                        $scope.$on('$destroy', function () {
                            $tgComponents.$removeInstance(self);
                        });
                    }]
                };
            }
        ]);
})();
