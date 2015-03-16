(function () {
    'use strict';

    angular.module('tg.components')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('tg-territory.tpl.html',
                '<div class="tg-territory">\
                    <div class="tg-territory__input-container">\
                        <div class="tg-territory__input"\
                             tg-typeahead=""\
                             tg-typeahead-disabled="$isDisabled()"\
                             tg-typeahead-tag-manager=""\
                             tg-typeahead-max-lines="4"\
                             tg-typeahead-tag-transform="true"\
                             tg-typeahead-tag-selected="onTagSelected(tag, sender);"\
                             tg-typeahead-tag-deselected="onTagDeselected(tag, sender);"\
                             ng-model="dataHolder.model">\
                            <div tg-typeahead-data-set="territory as territory.name for territory in dataHolder.source.all | tgTerritoryFilter:$viewValue">\
                                <div tg-typeahead-data-set-item="">\
                                    <span>{{$match.data.name}}</span>\
                                </div> \
                            </div>\
                            <div tg-typeahead-popup-footer="">\
                                <div class="tg-typeahead__suggestions-footer-inner" ng-show="$dataSets[0].queried.matches == 0">Territory with name <strong>{{$term}}</strong> doesn\'t exist.</div>\
                            </div>\
                        </div>\
                        <button class="tg-territory__button" ng-click="!$isDisabled() && openPopup();"></button>\
                    </div>\
                    <div class="tg-territory__popup" ng-if="stateHolder.popup.isOpen">\
                        <div class="tg-territory__popup-header">\
                            <span ng-switch="$isAllExpanded()">\
                                <a href="" ng-switch-when="false" ng-click="toggleAllClustersExpand(true); $event.stopPropagation();">Expand all</a>\
                                <a href="" ng-switch-when="true" ng-click="toggleAllClustersExpand(false); $event.stopPropagation();">Collapse all</a>\
                            </span>\
                            <span ng-switch="$isAllSelected()">\
                                <a href="" ng-switch-when="false" ng-click="toggleWorldwide(true); $event.stopPropagation();">Select all</a>\
                                <a href="" ng-switch-when="true" ng-click="toggleWorldwide(false); $event.stopPropagation();">Deselect all</a>\
                            </span>\
                        </div>\
                        <div class="tg-territory__popup-body">\
                            <div class="tg-territory__clusters">\
                                <div class="tg-territory__cluster" ng-repeat="cluster in dataHolder.source.clusters">\
                                    <div class="tg-territory__cluster-inner">\
                                        <div class="tg-territory__cluster-header" ng-click="toggleClusterExpand(cluster);">\
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
                                            <div ng-if="$isVisibleType(\'REGION\') && cluster.getRegions().length">\
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

    tgTerritoryFilter.$inject = ['utilities'];

    function tgTerritoryFilter(utilities) {
        return function (arr, val) {
            if (!val) {
                return arr;
            }

            val = val.toLowerCase();

            return utilities.select(arr, function (item) {
                if (item.name && item.name.toLowerCase().indexOf(val) !== -1) {
                    if (!item.getState().selected) {
                        return item;
                    }
                }
            });
        };
    }

    tgTerritoryUtilities.$inject = ['utilities'];

    function tgTerritoryUtilities(utilities) {
        function prepareSource(source, sourceTypes) {
            var preparedSource = {
                all: [],
                worldwide: undefined,
                clusters: [],
                regions: [],
                territories: []
            };

            if (!utilities.empty(source.worldwide)) {
                var worldwide = source.worldwide[0],
                    worldState = {
                        selected: false
                    };

                preparedSource.worldwide = {
                    id: worldwide.id,
                    name: worldwide.title,
                    type: 'WORLDWIDE',
                    getState: function () {
                        return worldState;
                    }
                };

                if (utilities.has(sourceTypes, 'WORLDWIDE')) {
                    preparedSource.all.push(preparedSource.worldwide);
                }
            }

            utilities.forEach(source.clusters, function (cluster) {
                var clusterRegions = [],
                    clusterTerritories = [],
                    clusterState = {
                        expanded: false,
                        selected: false,
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

            if (utilities.has(sourceTypes, 'CLUSTER')) {
                Array.prototype.push.apply(preparedSource.all, preparedSource.clusters);
            }
            if (utilities.has(sourceTypes, 'REGION')) {
                Array.prototype.push.apply(preparedSource.all, preparedSource.regions);
            }
            if (utilities.has(sourceTypes, 'COUNTRY')) {
                Array.prototype.push.apply(preparedSource.all, preparedSource.territories);
            }

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
                tgTerritory: '=?',
                tgTerritoryId: '@',
                tgTerritorySource: '=',
                tgTerritoryDisabled: '=?'
            },
            templateUrl: 'tg-territory.tpl.html',
            compile: function (tElement, tAttrs) {
                var $getModelValue = $parse(tAttrs.ngModel),
                    $setModelValue = $getModelValue.assign;

                function prepareOptions(obj, attrs, scope) {
                    var options = {};

                    if (attrs.tgTerritorySourceTypes) {
                        options.sourceTypes = $parse(attrs.tgTerritorySourceTypes)(scope);
                    } else {
                        options.sourceTypes = obj && obj.sourceTypes;
                    }

                    if (utilities.empty(options.sourceTypes)) {
                        options.sourceTypes = ['COUNTRY'];
                    }

                    if (attrs.tgTerritoryTagsTransform) {
                        options.tagsTransform = (attrs.tgTerritoryTagsTransform === 'true');
                    } else {
                        options.tagsTransform = obj && obj.tagsTransform || false;
                    }

                    return options;
                }

                function preLink(scope, element, attrs, controllers) {
                    var parentScope = scope.$parent,
                        selfCtrl = controllers[0],
                        ngModelCtrl = controllers[1],
                        options = prepareOptions(scope.tgTerritory, attrs, scope);

                    scope.dataHolder = {
                        source: tgTerritoryUtilities.prepareSource(scope.tgTerritorySource, options.sourceTypes),
                        model: []
                    };

                    scope.stateHolder = {
                        popup: {
                            isOpen: false,
                            dirty: false
                        },
                        disabled: false
                    };

                    scope.$isDisabled = function () {
                        return !!scope.tgTerritoryDisabled || scope.stateHolder.disabled;
                    };

                    scope.$isVisibleType = function (type) {
                        return utilities.has(options.sourceTypes, type);
                    };

                    scope.$isAllExpanded = function () {
                        var source = scope.dataHolder.source;

                        return !utilities.each(source.clusters, function (cluster) {
                            if (!cluster.getState().expanded) {
                                return true;
                            }
                        });
                    };

                    scope.$isAllSelected = function () {
                        var source = scope.dataHolder.source;

                        return !utilities.each(source.territories, function (territory) {
                            if (!territory.getState().selected) {
                                return true;
                            }
                        });
                    };

                    scope.openPopup = function () {
                        if (scope.$isVisibleType('CLUSTER')) {
                            scope.stateHolder.popup.isOpen = !scope.stateHolder.popup.isOpen;
                        }
                    };

                    scope.onOutsideClick = function () {
                        if (options.tagsTransform) {
                            getTypeaheadCtrl().switchToText();
                        }

                        if (scope.stateHolder.popup.isOpen && scope.stateHolder.popup.dirty) {
                            scope.stateHolder.popup.dirty = false;
                            updateModel();
                        }

                        scope.stateHolder.popup.isOpen = false;
                    };

                    scope.onInsideClick = function () {
                        if (options.tagsTransform) {
                            getTypeaheadCtrl().switchToTags();
                        }
                    };

                    scope.toggleAllClustersExpand = function (state) {
                        var clusters = scope.dataHolder.source.clusters;

                        utilities.forEach(clusters, function (cluster) {
                            var clusterState = cluster.getState();
                            clusterState.expanded = (state !== undefined) ? state : !clusterState.expanded;
                        });
                    };

                    scope.toggleClusterExpand = function (cluster) {
                        var clusterState = cluster.getState();
                        clusterState.expanded = !clusterState.expanded;
                    };

                    scope.expandClass = function (cluster) {
                        var clusterState = cluster.getState();
                        return (clusterState.expanded) ? 'fa-caret-down' : 'fa-caret-right';
                    };

                    scope.toggleWorldwide = function (state) {
                        var territories = scope.dataHolder.source.territories;

                        utilities.forEach(territories, function (territory) {
                            scope.toggleTerritorySelection(territory.getCluster(), territory, false, state);
                        });
                    };

                    scope.toggleTerritorySelection = function (cluster, territory, ignoreClusterUpdate, state) {
                        scope.stateHolder.popup.dirty = true;

                        var clusterState = cluster.getState(),
                            territoryState = territory.getState(),
                            selected = (state === true || state === false) ? state : !territoryState.selected;

                        if (territoryState.selected !== selected) {
                            territoryState.selected = selected;

                            if (territoryState.selected) {
                                clusterState.selectedTerritories++;
                            } else {
                                clusterState.selectedTerritories--;
                            }

                            if (!ignoreClusterUpdate) {
                                updateCluster(cluster);
                            }
                        }
                    };

                    scope.toggleClusterSelection = function (cluster, state) {
                        var clusterTerritories = getClusterTerritories(cluster);

                        if (state === true) {
                            utilities.forEach(clusterTerritories.unselectedTerritories, function (clusterTerritory) {
                                scope.toggleTerritorySelection(cluster, clusterTerritory, true, state);
                            });
                        } else if (state === false) {
                            utilities.forEach(clusterTerritories.selectedTerritories, function (clusterTerritory) {
                                scope.toggleTerritorySelection(cluster, clusterTerritory, true, state);
                            });
                        } else {
                            if (!utilities.empty(clusterTerritories.unselectedTerritories)) {
                                utilities.forEach(clusterTerritories.unselectedTerritories, function (clusterTerritory) {
                                    scope.toggleTerritorySelection(cluster, clusterTerritory, true, state);
                                });
                            } else {
                                utilities.forEach(clusterTerritories.selectedTerritories, function (clusterTerritory) {
                                    scope.toggleTerritorySelection(cluster, clusterTerritory, true, state);
                                });
                            }
                        }

                        updateCluster(cluster);
                    };

                    scope.toggleRegionSelection = function (cluster, region, state) {
                        var regionTerritories = getRegionTerritories(region);

                        if (state === true) {
                            utilities.forEach(regionTerritories.unselectedTerritories, function (regionTerritory) {
                                scope.toggleTerritorySelection(cluster, regionTerritory, true, state);
                            });
                        } else if (state === false) {
                            utilities.forEach(regionTerritories.selectedTerritories, function (regionTerritory) {
                                scope.toggleTerritorySelection(cluster, regionTerritory, true, state);
                            });
                        } else {
                            if (!utilities.empty(regionTerritories.unselectedTerritories)) {
                                utilities.forEach(regionTerritories.unselectedTerritories, function (regionTerritory) {
                                    scope.toggleTerritorySelection(cluster, regionTerritory, true, state);
                                });
                            } else {
                                utilities.forEach(regionTerritories.selectedTerritories, function (regionTerritory) {
                                    scope.toggleTerritorySelection(cluster, regionTerritory, true, state);
                                });
                            }
                        }

                        updateCluster(cluster);
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

                    scope.onTagSelected = function (tag, sender) {
                        if (sender !== 'ModelUpdate') {
                            var item = tag.match.data;

                            switch (item.type) {
                                case 'WORLDWIDE':
                                    scope.toggleWorldwide(true);
                                    break;
                                case 'CLUSTER':
                                    scope.toggleClusterSelection(item, true);
                                    break;
                                case 'REGION':
                                    scope.toggleRegionSelection(item.getCluster(), item, true);
                                    break;
                                case 'COUNTRY':
                                    scope.toggleTerritorySelection(item.getCluster(), item, false, true);
                                    break;
                            }

                            updateModel();
                        }
                    };

                    scope.onTagDeselected = function (tag, sender) {
                        if (sender !== 'ModelUpdate') {
                            var item = tag.match.data;

                            switch (item.type) {
                                case 'WORLDWIDE':
                                    scope.toggleWorldwide(false);
                                    break;
                                case 'CLUSTER':
                                    scope.toggleClusterSelection(item, false);
                                    break;
                                case 'REGION':
                                    scope.toggleRegionSelection(item.getCluster(), item, false);
                                    break;
                                case 'COUNTRY':
                                    scope.toggleTerritorySelection(item.getCluster(), item, false, false);
                                    break;
                            }

                            updateModel();
                        }
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
                        var clusterState = cluster.getState();
                        clusterState.selected = utilities.empty(getClusterTerritories(cluster).unselectedTerritories);

                        updateClusterRegions(cluster);
                    }

                    function updateClusterRegions(cluster) {
                        utilities.forEach(cluster.getRegions(), function (region) {
                            var regionState = region.getState();
                            regionState.selected = utilities.empty(getRegionTerritories(region).unselectedTerritories);
                        });
                    }

                    function updateModel() {
                        var source = scope.dataHolder.source,
                            model = scope.dataHolder.model,
                            selectedClusters = 0;

                        model.length = 0;

                        utilities.forEach(source.clusters, function (cluster) {
                            var clusterState = cluster.getState();

                            if (clusterState.selectedTerritories > 0) {
                                if (clusterState.selectedTerritories === cluster.getTerritories().length) {
                                    model.push(cluster);
                                    selectedClusters++;
                                } else {
                                    cluster.getTerritories().forEach(function (territory) {
                                        var territoryState = territory.getState();

                                        if (territoryState.selected) {
                                            model.push(territory);
                                        }
                                    });
                                }
                            }
                        });

                        if (selectedClusters === source.clusters.length) {
                            model.length = 0;
                            model.push(source.worldwide);
                        }
                    }

                    function getTypeaheadCtrl() {
                        var tgTypeaheadCtrl = element
                            .find('.tg-territory__input')
                            .controller('tgTypeahead');

                        return tgTypeaheadCtrl;
                    }

                    $setModelValue(parentScope, scope.dataHolder.model);
                }

                function postLink(scope, element, attrs, controllers) {
                    var onDocumentClick = function (evt) {
                        if (element.has(evt.target).length === 0) {
                            scope.onOutsideClick();
                            scope.$digest();
                        } else {
                            scope.onInsideClick();
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
