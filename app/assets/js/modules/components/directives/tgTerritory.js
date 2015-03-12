(function () {
    'use strict';

    angular.module('tg.components')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('tg-territory.tpl.html',
                '<div class="tg-territory">\
                    <div class="tg-territory__input-container">\
                        <div class="tg-territory__input"\
                             tg-typeahead=""\
                             tg-typeahead-tag-manager=""\
                             ng-model="dataHolder.model">\
                            <div tg-typeahead-data-set="cluster as cluster.title for cluster in dataHolder.source.all | filter:{title:$viewValue}">\
                                <div tg-typeahead-data-set-item="">\
                                    <span>{{$match.data.title}}</span>\
                                </div> \
                            </div>\
                        </div>\
                        <button class="tg-territory__button" ng-click="openPopup();"></button>\
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
                                                <i class="fa" ng-class="clusterSelectionClass(cluster)" ng-click="$event.stopPropagation(); toggleAllTerritoriesSelection(cluster);"></i>\
                                            </span>\
                                        </div>\
                                        <div ng-if="cluster._expanded">\
                                            <ul class="tg-territory__cluster-countries">\
                                                <li class="tg-territory__cluster-country" \
                                                    ng-repeat="territory in cluster._territories" \
                                                    ng-click="toggleTerritorySelection(cluster, territory);" \
                                                    ng-class="{\'m-active\':territory._selected}">\
                                                    <span>{{territory.title}}</span>\
                                                </li>\
                                            </ul>\
                                            <div ng-if="cluster._regions.length">\
                                                <p class="tg-territory__cluster-region-title">Regions</p>\
                                                <ul class="tg-territory__cluster-regions">\
                                                    <li class="tg-territory__cluster-region" \
                                                        ng-repeat="region in cluster._regions" \
                                                        ng-click="toggleRegionSelection(cluster, region);" \
                                                        ng-class="{\'m-active\':region._selected}">\
                                                        <span>{{region.title}}</span>\
                                                    </li>\
                                                </ul>\
                                            </div>\
                                        </div>\
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

                        function isType(obj, typeStr) {
                            return (Object.prototype.toString.call(obj) === typeStr);
                        }

                        function isObject(obj) {
                            return isType(obj, '[object Object]');
                        }

                        function isArray(obj) {
                            return isType(obj, '[object Array]');
                        }

                        function isFunction(obj) {
                            return isType(obj, '[object Function]');
                        }

                        function forEach(obj, fn) {
                            if (obj && isFunction(fn)) {
                                if (isArray(obj)) {
                                    for (var i = 0, n = obj.length; i < n; i++) {
                                        fn(obj[i], i, obj);
                                    }
                                } else if (isObject(obj)) {
                                    for (var key in obj) {
                                        if (obj.hasOwnProperty(key)) {
                                            fn(obj[key], key, obj);
                                        }
                                    }
                                }
                            }
                        }

                        function each(obj, fn) {
                            if (obj && isFunction(fn)) {
                                var result;

                                if (isArray(obj)) {
                                    for (var i = 0, n = obj.length; i < n; i++) {
                                        result = fn(obj[i], i, obj);

                                        if (result !== undefined) {
                                            return result;
                                        }
                                    }
                                } else if (isObject(obj)) {
                                    for (var key in obj) {
                                        if (obj.hasOwnProperty(key)) {
                                            result = fn(obj[key], key, obj);

                                            if (result !== undefined) {
                                                return result;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        function select(obj, fnProp, unique) {
                            var result = [];

                            each(obj, function (val, key) {
                                var r = fnProp(val, key, obj);

                                if (r !== undefined) {
                                    if (isArray(r)) {
                                        r.forEach(function (rs) {
                                            if (!unique || result.indexOf(rs) === -1) {
                                                result.push(rs);
                                            }
                                        });
                                    } else {
                                        if (!unique || result.indexOf(r) === -1) {
                                            result.push(r);
                                        }
                                    }
                                }
                            });

                            return result;
                        }

                        function empty(arr) {
                            return (!isArray(arr) || arr.length === 0);
                        }

                        function has(arr, val) {
                            return (!empty(arr) && arr.indexOf(val) > -1);
                        }

                        function prepareSource(source) {
                            var preparedSource = {
                                worldwide: undefined,
                                clusters: [],
                                regions: [],
                                territories: []
                            };

                            if (!empty(source.worldwide)) {
                                var worldwide = source.worldwide[0];

                                preparedSource.worldwide = {
                                    id: worldwide.id,
                                    name: worldwide.title
                                };
                            }

                            forEach(source.clusters, function (cluster) {
                                var clusterRegions = [],
                                    clusterTerritories = [],
                                    newCluster = {
                                        id: cluster.id,
                                        name: cluster.title,
                                        state: {
                                            expanded: false
                                        },
                                        getRegions: function () {
                                            return clusterRegions;
                                        },
                                        getTerritories: function () {
                                            return clusterTerritories;
                                        }
                                    };

                                if (!empty(source.countries)) {
                                    forEach(cluster.territory_ids, function (territoryId) {
                                        var territory = each(source.countries, function (territory) {
                                            if (territory.id === territoryId) {
                                                return territory;
                                            }
                                        });

                                        if (territory) {
                                            var newTerritory = {
                                                id: territory.id,
                                                name: territory.title,
                                                code: territory.alphanumeric_code,
                                                state: {
                                                    selected: false
                                                }
                                            };

                                            newCluster.getTerritories().push(newTerritory);
                                            preparedSource.territories.push(newTerritory);

                                            var regions = select(source.quickpicks, function (region) {
                                                return each(region.territory_ids, function (territoryId) {
                                                    if (territory.id === territoryId) {
                                                        return region;
                                                    }
                                                });
                                            });

                                            forEach(regions, function (region) {
                                                var newRegion = each(newCluster.getRegions(), function (newRegion) {
                                                    if (newRegion.id === region.id) {
                                                        return newRegion;
                                                    }
                                                });

                                                if (!newRegion) {
                                                    var regionTerritories = [],
                                                        newRegion = {
                                                            id: region.id,
                                                            name: region.title,
                                                            code: region.alphanumeric_code,
                                                            state: {
                                                                selected: false
                                                            },
                                                            getTerritories: function () {
                                                                return regionTerritories;
                                                            }
                                                        };

                                                    newCluster.getRegions().push(newRegion);
                                                    preparedSource.regions.push(newRegion);
                                                }

                                                newRegion.getTerritories().push(newTerritory);
                                            });
                                        }
                                    });
                                }

                                preparedSource.clusters.push(newCluster);
                            });

                            window.ps = preparedSource;
                            console.log(preparedSource);

                            source = angular.copy(source);

                            var worldwide = source.worldwide,
                                clusters = source.clusters || [],
                                countries = source.countries || [],
                                regions = source.quickpicks || [];

                            forEach(clusters, function (cluster) {
                                cluster._expanded = false;
                                cluster._regions = [];
                                cluster._territories = [];
                                cluster._selectedTerritoriesIds = [];

                                forEach(cluster.territory_ids, function (territoryId) {
                                    each(countries, function (territory) {
                                        if (territory.id === territoryId) {
                                            territory = angular.copy(territory);
                                            territory._selected = false;

                                            cluster._territories.push(territory);

                                            return territory;
                                        }
                                    });
                                });
                            });

                            forEach(regions, function (region) {
                                var activeCluster,
                                    activeRegion;

                                forEach(region.territory_ids, function (territoryId) {
                                    each(clusters, function (cluster) {
                                        if (has(cluster.territory_ids, territoryId)) {
                                            if (cluster !== activeCluster) {
                                                activeCluster = cluster;

                                                activeRegion = each(activeCluster._regions, function (clusterRegion) {
                                                    if (clusterRegion.id === region.id) {
                                                        return clusterRegion;
                                                    }
                                                });

                                                if (!activeRegion) {
                                                    activeRegion = angular.copy(region);
                                                    activeRegion._territories = [];
                                                    activeRegion._selected = false;

                                                    cluster._regions.push(activeRegion);
                                                }
                                            }

                                            return cluster;
                                        }
                                    });

                                    if (activeRegion && activeCluster) {
                                        var territory = each(activeCluster._territories, function (territory) {
                                            if (territory.id === territoryId) {
                                                return territory;
                                            }
                                        });

                                        if (territory) {
                                            activeRegion._territories.push(territory);
                                        }
                                    }
                                });
                            });

                            source.all = worldwide
                                .concat(clusters)
                                .concat(regions)
                                .concat(countries);

                            return source;
                        }

                        function preLink(scope, element, attrs, controllers) {
                            var parentScope = scope.$parent,
                                selfCtrl = controllers[0],
                                ngModelCtrl = controllers[1];

                            scope.dataHolder = {
                                source: prepareSource(scope.tgTerritorySource),
                                model: []
                            };

                            scope.stateHolder = {
                                popup: {
                                    isOpen: false,
                                    dirty: false
                                }
                            };

                            scope.openPopup = function () {
                                scope.stateHolder.popup.isOpen = true;
                            };

                            scope.onOutsideClick = function () {
                                if (scope.stateHolder.popup.isOpen && scope.stateHolder.popup.dirty) {
                                    scope.stateHolder.popup.dirty = false;

                                    updateModel();
                                }

                                scope.stateHolder.popup.isOpen = false;
                            };

                            scope.toggleExpand = function (cluster) {
                                cluster._expanded = !cluster._expanded;
                            };

                            scope.expandClass = function (cluster) {
                                return (cluster._expanded) ? 'fa-caret-down' : 'fa-caret-right';
                            };

                            scope.toggleTerritorySelection = function (cluster, territory, ignoreClusterUpdate) {
                                scope.stateHolder.popup.dirty = true;

                                territory._selected = !territory._selected;

                                if (territory._selected) {
                                    cluster._selectedTerritoriesIds.push(territory.id);
                                } else {
                                    var idx = cluster._selectedTerritoriesIds.indexOf(territory.id);

                                    if (idx !== -1) {
                                        cluster._selectedTerritoriesIds.splice(idx, 1);
                                    }
                                }

                                if (!ignoreClusterUpdate) {
                                    updateClusterRegions(cluster);
                                }
                            };

                            scope.toggleAllTerritoriesSelection = function (cluster) {
                                var clusterTerritories = getClusterTerritories(cluster);

                                if (!empty(clusterTerritories.unselectedTerritories)) {
                                    forEach(clusterTerritories.unselectedTerritories, function (clusterTerritory) {
                                        scope.toggleTerritorySelection(cluster, clusterTerritory, true);
                                    });
                                } else {
                                    forEach(clusterTerritories.selectedTerritories, function (clusterTerritory) {
                                        scope.toggleTerritorySelection(cluster, clusterTerritory, true);
                                    });
                                }

                                updateClusterRegions(cluster);
                            };

                            scope.toggleRegionSelection = function (cluster, region) {
                                var regionTerritories = getRegionTerritories(region);

                                if (!empty(regionTerritories.unselectedTerritories)) {
                                    forEach(regionTerritories.unselectedTerritories, function (regionTerritory) {
                                        scope.toggleTerritorySelection(cluster, regionTerritory, true);
                                    });
                                } else {
                                    forEach(regionTerritories.selectedTerritories, function (regionTerritory) {
                                        scope.toggleTerritorySelection(cluster, regionTerritory, true);
                                    });
                                }

                                updateClusterRegions(cluster);
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

                            function getClusterTerritories(cluster) {
                                var selectedTerritories = [],
                                    unselectedTerritories = [];

                                forEach(cluster._territories, function (territory) {
                                    if (territory._selected) {
                                        selectedTerritories.push(territory);
                                    } else {
                                        unselectedTerritories.push(territory);
                                    }
                                });

                                return {
                                    selectedTerritories: selectedTerritories,
                                    unselectedTerritories: unselectedTerritories
                                };
                            }

                            function getRegionTerritories(region) {
                                var selectedTerritories = [],
                                    unselectedTerritories = [];

                                forEach(region._territories, function (territory) {
                                    if (territory._selected) {
                                        selectedTerritories.push(territory);
                                    } else {
                                        unselectedTerritories.push(territory);
                                    }
                                });

                                return {
                                    selectedTerritories: selectedTerritories,
                                    unselectedTerritories: unselectedTerritories
                                };
                            }

                            function updateClusterRegions(cluster) {
                                forEach(cluster._regions, function (region) {
                                    region._selected = empty(getRegionTerritories(region).unselectedTerritories);
                                });
                            }

                            function updateModel() {
                                scope.dataHolder.model.splice(0, scope.dataHolder.model.length);

                                var source = scope.dataHolder.source;

                                source.clusters.forEach(function (cluster) {
                                    if (cluster._selectedTerritoriesIds.length > 0) {
                                        if (cluster._selectedTerritoriesIds.length === cluster._territories.length) {
                                            scope.dataHolder.model.push(cluster);
                                        }
                                    }
                                });

                                source.clusters.forEach(function (cluster) {
                                    if (cluster._selectedTerritoriesIds.length > 0) {
                                        if (cluster._selectedTerritoriesIds.length !== cluster._territories.length) {
                                            cluster._territories.forEach(function (territory) {
                                                if (territory._selected) {
                                                    scope.dataHolder.model.push(territory);
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                            $setModelValue(parentScope, scope.dataHolder.model);
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
