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
                             tg-typeahead-tag-selected="onTagSelected(tag);"\
                             tg-typeahead-tag-deselected="onTagDeselected(tag);"\
                             ng-model="dataHolder.model">\
                            <div tg-typeahead-data-set="territory as territory.name for territory in dataHolder.source.all | tgTerritoryFilter:$viewValue">\
                                <div tg-typeahead-data-set-item="">\
                                    <span>{{$match.data.name}}</span>\
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
                                                {{cluster.name}}\
                                            </span>\
                                            <span class="pull-right">\
                                                {{cluster.getState().selectedTerritories}}/{{cluster.getTerritories().length}}\
                                                <i class="fa" ng-class="clusterSelectionClass(cluster)" ng-click="$event.stopPropagation(); toggleClusterSelection(cluster);"></i>\
                                            </span>\
                                        </div>\
                                        <div ng-if="cluster.getState().expanded">\
                                            <ul class="tg-territory__cluster-countries">\
                                                <li class="tg-territory__cluster-country" \
                                                    ng-repeat="territory in cluster.getTerritories()" \
                                                    ng-click="toggleTerritorySelection(cluster, territory);" \
                                                    ng-class="{\'m-active\':territory.getState().selected}">\
                                                    <span>{{territory.name}}</span>\
                                                </li>\
                                            </ul>\
                                            <div ng-if="cluster.getRegions().length">\
                                                <p class="tg-territory__cluster-region-title">Regions</p>\
                                                <ul class="tg-territory__cluster-regions">\
                                                    <li class="tg-territory__cluster-region" \
                                                        ng-repeat="region in cluster.getRegions()" \
                                                        ng-click="toggleRegionSelection(cluster, region);" \
                                                        ng-class="{\'m-active\':region.getState().selected}">\
                                                        <span>{{region.name}}</span>\
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
        .filter('tgTerritoryFilter', tgTerritoryFilter)
        .factory('tgTerritoryUtilities', tgTerritoryUtilities)
        .directive('tgTerritory', tgTerritory);

    tgTerritoryFilter.$inject = ['$filter', 'utilities'];

    function tgTerritoryFilter($filter, utilities) {
        return function (arr, val) {
            if (!val) {
                return arr;
            }

            val = val.toLowerCase();

            return utilities.select(arr, function (item) {
                if (item.name && item.name.toLowerCase().indexOf(val) !== -1 && !item.getState().selected) {
                    return item;
                }
            });
        };
    }

    tgTerritoryUtilities.$inject = ['utilities'];

    function tgTerritoryUtilities(utilities) {
        function prepareSource(source) {
            var preparedSource = {
                all: [],
                worldwide: undefined,
                clusters: [],
                regions: [],
                territories: []
            };

            if (!utilities.empty(source.worldwide)) {
                var worldwide = source.worldwide[0];

                preparedSource.worldwide = {
                    id: worldwide.id,
                    name: worldwide.title,
                    type: 'WORLDWIDE'
                };

                preparedSource.all.push(preparedSource.worldwide);
            }

            utilities.forEach(source.clusters, function (cluster) {
                var clusterRegions = [],
                    clusterTerritories = [],
                    clusterState = {
                        expanded: false,
                        selectedTerritories: 0
                    },
                    newCluster = {
                        id: cluster.id,
                        name: cluster.title,
                        type: 'CLUSTER',
                        getRegions: function () {
                            return clusterRegions;
                        },
                        getTerritories: function () {
                            return clusterTerritories;
                        },
                        getState: function () {
                            return clusterState;
                        }
                    };

                if (!utilities.empty(source.countries)) {
                    utilities.forEach(cluster.territory_ids, function (territoryId) {
                        var territory = utilities.each(source.countries, function (territory) {
                            if (territory.id === territoryId) {
                                return territory;
                            }
                        });

                        if (territory) {
                            var territoryState = {
                                    selected: false
                                },
                                newTerritory = {
                                    id: territory.id,
                                    name: territory.title,
                                    code: territory.alphanumeric_code,
                                    type: 'COUNTRY',
                                    getCluster: function () {
                                        return newCluster;
                                    },
                                    getState: function () {
                                        return territoryState;
                                    }
                                };

                            newCluster.getTerritories().push(newTerritory);
                            preparedSource.territories.push(newTerritory);

                            var regions = utilities.select(source.quickpicks, function (region) {
                                return utilities.each(region.territory_ids, function (territoryId) {
                                    if (territory.id === territoryId) {
                                        return region;
                                    }
                                });
                            });

                            utilities.forEach(regions, function (region) {
                                var newRegion = utilities.each(newCluster.getRegions(), function (newRegion) {
                                    if (newRegion.id === region.id) {
                                        return newRegion;
                                    }
                                });

                                if (!newRegion) {
                                    var regionTerritories = [],
                                        regionState = {
                                            selected: false
                                        },
                                        newRegion = {
                                            id: region.id,
                                            name: region.title,
                                            code: region.alphanumeric_code,
                                            type: 'REGION',
                                            getTerritories: function () {
                                                return regionTerritories;
                                            },
                                            getCluster: function () {
                                                return newCluster;
                                            },
                                            getState: function () {
                                                return regionState;
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

            Array.prototype.push.apply(preparedSource.all, preparedSource.clusters);
            Array.prototype.push.apply(preparedSource.all, preparedSource.regions);
            Array.prototype.push.apply(preparedSource.all, preparedSource.territories);

            console.log(preparedSource);

            return preparedSource;
        }

        return {
            prepareSource: prepareSource
        };
    }

    tgTerritory.$inject = ['$tgComponents', '$parse', '$document', 'tgTerritoryUtilities', 'utilities'];

    function tgTerritory($tgComponents, $parse, $document, tgTerritoryUtilities, utilities) {
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

                function preLink(scope, element, attrs, controllers) {
                    var parentScope = scope.$parent,
                        selfCtrl = controllers[0],
                        ngModelCtrl = controllers[1];

                    scope.dataHolder = {
                        source: tgTerritoryUtilities.prepareSource(scope.tgTerritorySource),
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
                        var clusterState = cluster.getState();
                        clusterState.expanded = !clusterState.expanded;
                    };

                    scope.expandClass = function (cluster) {
                        var clusterState = cluster.getState();
                        return (clusterState.expanded) ? 'fa-caret-down' : 'fa-caret-right';
                    };

                    scope.toggleTerritorySelection = function (cluster, territory, ignoreClusterUpdate) {
                        scope.stateHolder.popup.dirty = true;

                        var clusterState = cluster.getState(),
                            territoryState = territory.getState();

                        territoryState.selected = !territoryState.selected;

                        if (territoryState.selected) {
                            clusterState.selectedTerritories++;
                        } else {
                            clusterState.selectedTerritories--;
                        }

                        if (!ignoreClusterUpdate) {
                            updateClusterRegions(cluster);
                        }
                    };

                    scope.toggleClusterSelection = function (cluster) {
                        var clusterTerritories = getClusterTerritories(cluster);

                        if (!utilities.empty(clusterTerritories.unselectedTerritories)) {
                            utilities.forEach(clusterTerritories.unselectedTerritories, function (clusterTerritory) {
                                scope.toggleTerritorySelection(cluster, clusterTerritory, true);
                            });
                        } else {
                            utilities.forEach(clusterTerritories.selectedTerritories, function (clusterTerritory) {
                                scope.toggleTerritorySelection(cluster, clusterTerritory, true);
                            });
                        }

                        updateClusterRegions(cluster);
                    };

                    scope.toggleRegionSelection = function (cluster, region) {
                        var regionTerritories = getRegionTerritories(region);

                        if (!utilities.empty(regionTerritories.unselectedTerritories)) {
                            utilities.forEach(regionTerritories.unselectedTerritories, function (regionTerritory) {
                                scope.toggleTerritorySelection(cluster, regionTerritory, true);
                            });
                        } else {
                            utilities.forEach(regionTerritories.selectedTerritories, function (regionTerritory) {
                                scope.toggleTerritorySelection(cluster, regionTerritory, true);
                            });
                        }

                        updateClusterRegions(cluster);
                    };

                    scope.clusterSelectionClass = function (cluster) {
                        var clusterState = cluster.getState();

                        if (clusterState.selectedTerritories === cluster.getTerritories().length) {
                            return 'fa-check-square-o';
                        } else if (clusterState.selectedTerritories > 0) {
                            return 'fa-minus-square-o';
                        }

                        return 'fa-square-o';
                    };

                    scope.onTagSelected = function (tag) {
                        var item = tag.match.data,
                            state = item.getState();

                        switch (item.type) {
                            case 'WORLDWIDE':
                                break;
                            case 'CLUSTER':
                                scope.toggleClusterSelection(item);
                                break;
                            case 'REGION':
                                if (!state.selected) {
                                    scope.toggleRegionSelection(item.getCluster(), item);
                                }
                                break;
                            case 'COUNTRY':
                                if (!state.selected) {
                                    scope.toggleTerritorySelection(item.getCluster(), item, false);
                                }
                                break;
                        }

                        updateModel();
                    };

                    scope.onTagDeselected = function (tag) {
                        var item = tag.match.data,
                            state = item.getState();

                        switch (item.type) {
                            case 'WORLDWIDE':
                                break;
                            case 'CLUSTER':
                                scope.toggleClusterSelection(item);
                                break;
                            case 'REGION':
                                if (state.selected) {
                                    scope.toggleRegionSelection(item.getCluster(), item);
                                }
                                break;
                            case 'COUNTRY':
                                if (state.selected) {
                                    scope.toggleTerritorySelection(item.getCluster(), item, false);
                                }
                                break;
                        }

                        updateModel();
                    };

                    function getClusterTerritories(cluster) {
                        var selectedTerritories = [],
                            unselectedTerritories = [];

                        utilities.forEach(cluster.getTerritories(), function (territory) {
                            var territoryState = territory.getState();

                            if (territoryState.selected) {
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

                        utilities.forEach(region.getTerritories(), function (territory) {
                            var territoryState = territory.getState();

                            if (territoryState.selected) {
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

                    function updateCluster(cluster) {
                        utilities.forEach(cluster.getRegions(), function (region) {
                            var regionState = region.getState();
                            regionState.selected = utilities.empty(getRegionTerritories(region).unselectedTerritories);
                        });
                    }

                    function updateClusterRegions(cluster) {
                        utilities.forEach(cluster.getRegions(), function (region) {
                            var regionState = region.getState();
                            regionState.selected = utilities.empty(getRegionTerritories(region).unselectedTerritories);
                        });
                    }

                    function updateModel() {
                        scope.dataHolder.model.splice(0, scope.dataHolder.model.length);

                        var source = scope.dataHolder.source;

                        source.clusters.forEach(function (cluster) {
                            var clusterState = cluster.getState();

                            if (clusterState.selectedTerritories > 0) {
                                if (clusterState.selectedTerritories === cluster.getTerritories().length) {
                                    scope.dataHolder.model.push(cluster);
                                }
                            }
                        });

                        source.clusters.forEach(function (cluster) {
                            var clusterState = cluster.getState();

                            if (clusterState.selectedTerritories > 0) {
                                if (clusterState.selectedTerritories !== cluster.getTerritories().length) {
                                    cluster.getTerritories().forEach(function (territory) {
                                        var territoryState = territory.getState();

                                        if (territoryState.selected) {
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
})();
