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
                             tg-typeahead-tag-manager="$dataHolder.options"\
                             tg-typeahead-tag-selected="$onTagSelected(tag, sender);"\
                             tg-typeahead-tag-deselected="$onTagDeselected(tag, sender);"\
                             ng-model="$dataHolder.model">\
                            <div tg-typeahead-data-set="territory as territory.name for territory in $dataHolder.source.all | tgTerritoryFilter:$viewValue">\
                                <div tg-typeahead-data-set-item="">\
                                    <div ng-init="$match.disabled = $match.data.getState().selected;">\
                                        <span tg-highlight-html="{{ $term }}">{{$match.data.name}}</span>\
                                        <div class="tg-territory__countries-counter" ng-if="$external.$isTerritoriesGroup($match.data)">{{$match.data.getCountries().length}} countries</div>\
                                    </div>\
                                </div> \
                            </div>\
                            <div tg-typeahead-popup-footer="">\
                                <div class="tg-typeahead__suggestions-footer-inner" ng-show="$dataSets[0].queried.matches == 0">Territory with name <strong>{{$term}}</strong> doesn\'t exist.</div>\
                            </div>\
                        </div>\
                        \
                        <button class="tg-territory__globe-button" ng-if="$isVisibleGlobeButton()" ng-class="{\'tg-territory__loading-button\':$stateHolder.loading}" ng-click="!$isDisabled() && $openPopup();"></button>\
                    </div>\
                    <div class="tg-territory__popup" ng-if="$stateHolder.popup.isOpen">\
                        <div class="tg-territory__popup-header">\
                            <div class="pull-left" ng-switch="$isAllExpanded()">\
                                <button class="tg-territory__btn" ng-switch-when="false" ng-click="$event.stopPropagation(); $toggleAllClustersExpand(true);">Expand all</button>\
                                <button class="tg-territory__btn" ng-switch-when="true" ng-click="$event.stopPropagation(); $toggleAllClustersExpand(false);">Collapse all</button>\
                            </div>\
                            <div class="pull-left" ng-switch="$isAllSelected()">\
                                <button class="tg-territory__btn" ng-switch-when="false" ng-click="$event.stopPropagation(); $toggleWorldwide(true);">Select all</button>\
                                <button class="tg-territory__btn" ng-switch-when="true" ng-click="$event.stopPropagation(); $toggleWorldwide(false);">Deselect all</button>\
                            </div>\
                            <button class="tg-territory__btn pull-right" ng-click="$closePopup();">Close</button>\
                        </div>\
                        <div class="tg-territory__popup-header">\
                            <span>{{$stateHolder.territoriesLabel}}</span>\
                        </div>\
                        <div class="tg-territory__popup-body">\
                            <div class="tg-territory__clusters">\
                                <div class="tg-territory__cluster" ng-repeat="cluster in ::$dataHolder.source.clusters track by cluster.id">\
                                    <div class="tg-territory__cluster-inner">\
                                        <div class="tg-territory__cluster-header" ng-click="$toggleClusterExpand(cluster);">\
                                            <span class="pull-left">\
                                                <i class="tg-territory__caret fa" ng-class="$expandClusterClass(cluster)"></i>\
                                                {{::cluster.name}}\
                                            </span>\
                                            <span class="pull-right">\
                                                {{cluster.getState().selectedCountries}}/{{cluster.getCountries().length}}\
                                                <i class="fa" ng-class="$clusterSelectionClass(cluster)" ng-click="$event.stopPropagation(); $toggleClusterSelection(cluster);"></i>\
                                            </span>\
                                        </div>\
                                        <div class="tg-territory__cluster-body"\
                                             ng-if="cluster.getState().expanded">\
                                            <ul class="tg-territory__cluster-countries">\
                                                <li class="tg-territory__cluster-country" \
                                                    ng-repeat="country in ::cluster.getCountries() track by country.id" \
                                                    ng-click="$toggleCountrySelection(cluster, country);" \
                                                    ng-class="{\'m-active\':country.getState().selected}">\
                                                    {{::country.name}}\
                                                </li>\
                                            </ul>\
                                            <div ng-if="$isVisibleType(\'REGION\') && cluster.getRegions().length">\
                                                <div class="tg-territory__cluster-region-title">Regions</div>\
                                                <ul class="tg-territory__cluster-regions">\
                                                    <li class="tg-territory__cluster-region" \
                                                        ng-repeat="region in ::cluster.getRegions() track by region.id" \
                                                        ng-click="$toggleRegionSelection(cluster, region);" \
                                                        ng-class="{\'m-active\':region.getState().selected}">\
                                                        <span>{{::region.name}}</span>\
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

            $templateCache.put('tg-territory-tag-manager.tpl.html',
                '<div class="tg-typeahead__tag-manager"\
                      ng-class="$templates.tagManager.wrapper.class"\
                      ng-style="$templates.tagManager.wrapper.style">\
                   <div ng-if="!$stateHolder.tagsTransformed"\
                        ng-repeat="$tag in $tags track by $tag.match.model.id | orderBy:$tagsOrder">\
                       <div tg-typeahead-render-template="$templates.tagManager.tag"></div>\
                   </div>\
                   <div class="tg-typeahead__tags-text"\
                        ng-if="$stateHolder.tagsTransformed">{{ $getTagsText() }}</div>\
                </div>');

            $templateCache.put('tg-territory-tag.tpl.html',
                '<div class="tg-typeahead__tag tg-territory__tag tg-territory__tag-type-{{ ::$tag.match.model.type }}">\
                    <span class="tg-typeahead__tag-remove fa fa-times" rel="tooltip"\
                          tooltip-html-unsafe="delete"\
                          tooltip-placement="right"\
                          ng-class="{\'disabled\': $isDisabled()}"\
                          ng-click="!$isDisabled() && $removeTag($tag); $event.stopPropagation();"></span>\
                    <span class="tg-typeahead__tag-name"\
                          ng-bind-html="::$tag.match.value | tgTrustedHtml"></span>\
                </div>');
        }])
        .filter('tgTerritoryFilter', tgTerritoryFilter)
        .factory('tgTerritoryUtilities', tgTerritoryUtilities)
        .provider('tgTerritoryService', tgTerritoryServiceProvider)
        .directive('tgTerritory', tgTerritory);

    tgTerritoryFilter.$inject = ['$injector'];

    function tgTerritoryFilter($injector) {
        var tgUtilities = $injector.get('tgUtilities');

        return function (arr, val) {
            if (!val) {
                return arr;
            }

            val = val.toLowerCase();

            return tgUtilities.select(arr, function (item) {
                if (item.name && item.name.toLowerCase().indexOf(val) !== -1) {
                    //if (!item.getState().selected) {
                    return item;
                    //}
                }
            });
        };
    }

    tgTerritoryUtilities.$inject = ['$injector', '$log'];

    function tgTerritoryUtilities($injector, $log) {
        var CLUSTERS_ORDER = [10005, 10000, 10004, 10002, 10003, 10001];

        var tgUtilities = $injector.get('tgUtilities');

        function WorldwideTerritoryModel(id, name, raw) {
            var countries = [],
                state = {
                    selected: false
                };

            this.id = id;
            this.name = name;
            this.type = 'worldwide';

            this.getCountries = function () {
                return countries;
            };

            this.getState = function () {
                return state;
            };

            this.getRaw = function () {
                return raw;
            };
        }

        function ClusterTerritoryModel(id, name, raw) {
            var regions = [],
                countries = [],
                state = {
                    selected: false,
                    expanded: false,
                    selectedCountries: 0
                };

            this.id = id;
            this.name = name;
            this.type = 'cluster';

            this.getRegions = function () {
                return regions;
            };

            this.getCountries = function () {
                return countries;
            };

            this.getState = function () {
                return state;
            };

            this.getRaw = function () {
                return raw;
            };
        }

        function RegionTerritoryModel(id, name, clusterModel, raw) {
            var cluster = clusterModel,
                countries = [],
                state = {
                    selected: false
                };

            this.id = id;
            this.name = name;
            this.type = 'region';

            this.getCluster = function () {
                return cluster;
            };

            this.getCountries = function () {
                return countries;
            };

            this.getState = function () {
                return state;
            };

            this.getRaw = function () {
                return raw;
            };
        }

        function CountryTerritoryModel(id, name, code, clusterModel, raw) {
            var cluster = clusterModel,
                regions = [],
                state = {
                    selected: false
                };

            this.id = id;
            this.name = name;
            this.code = code;
            this.type = 'country';

            this.getCluster = function () {
                return cluster;
            };

            this.getRegions = function () {
                return regions;
            };

            this.getState = function () {
                return state;
            };

            this.getRaw = function () {
                return raw;
            };
        }

        function prepareRawData(source, sourceTypes) {
            var data = {
                all: [],
                worldwide: undefined,
                clusters: [],
                regions: [],
                countries: []
            };

            if (source) {
                // prepare active worldwide
                if (!tgUtilities.empty(source.worldwide) && tgUtilities.has(sourceTypes, 'WORLDWIDE')) {
                    data.worldwide = tgUtilities.each(source.worldwide, function (worldwide) {
                        if (worldwide.active) {
                            return new WorldwideTerritoryModel(worldwide.id, worldwide.title, worldwide);
                        }
                    });

                    data.all.push(data.worldwide);
                }

                // prepare all active clusters
                if (!tgUtilities.empty(source.clusters) && tgUtilities.has(sourceTypes, 'CLUSTER')) {
                    tgUtilities.forEach(source.clusters, function (cluster) {
                        if (cluster.active) {
                            var clusterModel = new ClusterTerritoryModel(cluster.id, cluster.title, cluster);

                            // add current cluster to common list of clusters
                            data.clusters.push(clusterModel);
                        }
                    });

                    // sort ascending clusters
                    tgUtilities.sort(data.clusters, function (t1, t2) {
                        return CLUSTERS_ORDER.indexOf(t1.id) - CLUSTERS_ORDER.indexOf(t2.id);
                    });

                    Array.prototype.push.apply(data.all, data.clusters);
                }

                // prepare all active regions
                if (!tgUtilities.empty(source.quickpicks) && tgUtilities.has(sourceTypes, 'REGION')) {
                    tgUtilities.forEach(source.quickpicks, function (region) {
                        if (region.active) {
                            // get region specific cluster
                            var cluster = tgUtilities.each(data.clusters, function (cluster) {
                                // match all region territories in cluster territories list
                                var result = tgUtilities.each(region.territory_ids, function (territoryId) {
                                    if (cluster.getRaw().territory_ids.indexOf(territoryId) === -1) {
                                        return true;
                                    }
                                });

                                if (!result) {
                                    return cluster;
                                }
                            });

                            var regionModel = new RegionTerritoryModel(region.id, region.title, cluster, region);

                            // add current region to common list of regions
                            data.regions.push(regionModel);

                            if (cluster) {
                                // add current region to cluster list of regions
                                cluster.getRegions().push(regionModel);
                            }
                        }
                    });

                    // sort ascending regions
                    tgUtilities.sort(data.regions, function (t1, t2) {
                        return (t1.name > t2.name) ? 1 : ((t1.name < t2.name) ? -1 : 0);
                    });

                    tgUtilities.forEach(data.clusters, function (cluster) {
                        // sort ascending regions inside cluster
                        tgUtilities.sort(cluster.getRegions(), function (t1, t2) {
                            return (t1.name > t2.name) ? 1 : ((t1.name < t2.name) ? -1 : 0);
                        });
                    });

                    Array.prototype.push.apply(data.all, data.regions);
                }

                // prepare all active countries
                if (!tgUtilities.empty(source.countries) && tgUtilities.has(sourceTypes, 'COUNTRY')) {
                    tgUtilities.forEach(source.countries, function (country) {
                        if (country.active) {
                            // get country specific cluster
                            var cluster = tgUtilities.each(data.clusters, function (cluster) {
                                if (cluster.getRaw().territory_ids.indexOf(country.id) !== -1) {
                                    return cluster;
                                }
                            });

                            // get country specific regions
                            var regions = tgUtilities.select(data.regions, function (region) {
                                if (region.getRaw().territory_ids.indexOf(country.id) !== -1) {
                                    return region;
                                }
                            });

                            var countryModel = new CountryTerritoryModel(country.id, country.title, country.alphanumeric_code, cluster, country);

                            // add current country to common list of countries
                            data.countries.push(countryModel);

                            if (cluster) {
                                // add current country to cluster list of countries
                                cluster.getCountries().push(countryModel);
                            }

                            if (!tgUtilities.empty(regions)) {
                                tgUtilities.forEach(regions, function (region) {
                                    // add current country to region list of countries
                                    region.getCountries().push(countryModel);
                                    // add region to country list of regions
                                    countryModel.getRegions().push(region);
                                });
                            }

                            if (data.worldwide) {
                                if (data.worldwide.getRaw().territory_ids.indexOf(country.id) !== -1) {
                                    data.worldwide.getCountries().push(countryModel);
                                }
                            }
                        }
                    });

                    // sort ascending countries
                    tgUtilities.sort(data.countries, function (t1, t2) {
                        return (t1.name > t2.name) ? 1 : ((t1.name < t2.name) ? -1 : 0);
                    });

                    tgUtilities.forEach(data.clusters, function (cluster) {
                        // sort ascending countries inside cluster
                        tgUtilities.sort(cluster.getCountries(), function (t1, t2) {
                            return (t1.name > t2.name) ? 1 : ((t1.name < t2.name) ? -1 : 0);
                        });
                    });

                    Array.prototype.push.apply(data.all, data.countries);
                }
            }

            $log.debug('prepareRawData::data', data);

            return data;
        }

        function validateTerritories(territoriesIds, data, expand) {
            var territories = [];

            if (!tgUtilities.empty(territoriesIds) && data) {
                if (expand) {
                    tgUtilities.forEach(territoriesIds, function (territoriesId) {
                        // ignore territory if it already exist in result list
                        if (territories.indexOf(territoriesId) !== -1) {
                            return;
                        }

                        if (data.worldwide && data.worldwide.id === territoriesId) {
                            // push all the countries inside worldwide
                            tgUtilities.forEach(data.worldwide.getCountries(), function (country) {
                                if (territories.indexOf(country.id) === -1) {
                                    territories.push(country.id);
                                }
                            });

                            return;
                        }

                        // find match in common clusters list
                        var cluster = tgUtilities.each(data.clusters, function (cluster) {
                            if (cluster.id === territoriesId) {
                                return cluster;
                            }
                        });

                        if (cluster) {
                            // push all the countries inside cluster
                            tgUtilities.forEach(cluster.getCountries(), function (country) {
                                if (territories.indexOf(country.id) === -1) {
                                    territories.push(country.id);
                                }
                            });

                            return;
                        }

                        // find match in common regions list
                        var region = tgUtilities.each(data.regions, function (region) {
                            if (region.id === territoriesId) {
                                return region;
                            }
                        });

                        if (region) {
                            // push all the countries inside region
                            tgUtilities.forEach(region.getCountries(), function (country) {
                                if (territories.indexOf(country.id) === -1) {
                                    territories.push(country.id);
                                }
                            });

                            return;
                        }

                        // find match in common countries list
                        var country = tgUtilities.each(data.countries, function (country) {
                            if (country.id === territoriesId) {
                                return country;
                            }
                        });

                        if (country) {
                            // push country
                            if (territories.indexOf(territoriesId) === -1) {
                                territories.push(territoriesId);
                            }
                        }
                    });
                } else {
                    // check if list contains worldwide
                    if (data.worldwide && territoriesIds.indexOf(data.worldwide.id) !== -1) {
                        territories.push(data.worldwide.id);
                    } else {
                        // get used clusters
                        var clusters = tgUtilities.select(data.clusters, function (cluster) {
                            if (territoriesIds.indexOf(cluster.id) !== -1) {
                                return cluster;
                            }
                        });

                        // get used countries
                        var countries = tgUtilities.select(data.countries, function (country) {
                            if (territoriesIds.indexOf(country.id) !== -1 &&
                                clusters.indexOf(country.getCluster()) === -1) {
                                return country;
                            }
                        });

                        // collect countries from used regions
                        tgUtilities.forEach(data.regions, function (region) {
                            if (territoriesIds.indexOf(region.id) !== -1 &&
                                clusters.indexOf(region.getCluster()) === -1) {
                                tgUtilities.forEach(region.getCountries(), function (country) {
                                    if (countries.indexOf(country) === -1) {
                                        countries.push(country);
                                    }
                                });
                            }
                        });

                        // collect compressed clusters
                        tgUtilities.forEach(data.clusters, function (cluster) {
                            if (clusters.indexOf(cluster) === -1) {
                                var _countries = tgUtilities.select(countries, function (country) {
                                    if (cluster.getCountries().indexOf(country) !== -1) {
                                        return country;
                                    }
                                });

                                if (_countries.length === cluster.getCountries().length) {
                                    clusters.push(cluster);

                                    // filter merged countries
                                    countries = tgUtilities.select(countries, function (country) {
                                        if (_countries.indexOf(country) === -1) {
                                            return country;
                                        }
                                    });
                                }
                            }
                        });

                        // if all clusters are used, then add worldwide to result list
                        if (clusters.length && data.clusters.length === clusters.length && data.worldwide) {
                            territories.push(data.worldwide.id);
                        } else {
                            // add all used cluster to result list
                            tgUtilities.forEach(clusters, function (cluster) {
                                territories.push(cluster.id);
                            });

                            var regions = data.regions.slice();

                            // sort descending by countries number
                            tgUtilities.sort(regions, function (r1, r2) {
                                return r2.getCountries().length - r1.getCountries().length;
                            });

                            // collect compressed regions
                            tgUtilities.forEach(regions, function (region) {
                                var _countries = tgUtilities.select(countries, function (country) {
                                    if (region.getCountries().indexOf(country) !== -1) {
                                        return country;
                                    }
                                });

                                if (_countries.length === region.getCountries().length) {
                                    territories.push(region.id);

                                    // filter merged countries
                                    countries = tgUtilities.select(countries, function (country) {
                                        if (_countries.indexOf(country) === -1) {
                                            return country;
                                        }
                                    });
                                }
                            });

                            // collect remained countries
                            tgUtilities.select(countries, function (country) {
                                territories.push(country.id);
                            });
                        }
                    }
                }
            }

            // sort ascending
            tgUtilities.sort(territories, function (t1, t2) {
                return t1 - t2;
            });

            return territories;
        }

        function getTerritories(territoriesIds, data, sort) {
            var territories = [];

            if (!tgUtilities.empty(territoriesIds) && data) {
                tgUtilities.forEach(data.all, function (territory) {
                    if (territoriesIds.indexOf(territory.id) !== -1) {
                        territories.push(territory);
                    }
                });
            }

            if (sort) {
                tgUtilities.sort(territories, function (t1, t2) {
                    if (t1.type === t2.type) {
                        return (t1.name > t2.name) ? 1 : ((t1.name < t2.name) ? -1 : 0);
                    }

                    var k1 = 0, k2 = 0;

                    switch (t1.type) {
                        case 'worldwide':
                            k1 = 1000000;
                            break;
                        case 'cluster':
                            k1 = 100000;
                            break;
                        case 'region':
                            k1 = 10000;
                            break;
                        case 'country':
                            k1 = 1000;
                            break;
                    }

                    switch (t2.type) {
                        case 'worldwide':
                            k2 = 1000000;
                            break;
                        case 'cluster':
                            k2 = 100000;
                            break;
                        case 'region':
                            k2 = 10000;
                            break;
                        case 'country':
                            k2 = 1000;
                            break;
                    }

                    return k2 - k1;
                });
            }

            return territories;
        }

        function getTerritoriesLabel(territoriesIds, data) {
            territoriesIds = validateTerritories(territoriesIds, data, true);

            if (!tgUtilities.empty(territoriesIds)) {
                // if all countries are used, then display `Worldwide`
                if (territoriesIds.length === data.countries.length && data.worldwide) {
                    return data.worldwide.name;
                }

                var numberOfUnusedCountries = data.countries.length - territoriesIds.length;

                // worldwide exclusion rule:
                //      - number of unused countries should be less or equal than 10
                // if worldwide exclusion rule is applicable, then display `Worldwide excluding [<unused country>]`
                if (numberOfUnusedCountries > 0 && numberOfUnusedCountries <= 10) {
                    var unusedCountriesNames = tgUtilities.select(data.countries, function (country) {
                        if (territoriesIds.indexOf(country.id) === -1) {
                            return country.name;
                        }
                    });

                    // sort excluded countries in alphabetical order
                    unusedCountriesNames.sort();

                    return data.worldwide.name + ' excluding ' + tgUtilities.naturalJoin(unusedCountriesNames, ', ', ' and ');
                }

                var usedCountries = getTerritories(territoriesIds, data),
                    groupedCountriesByCluster = {},
                    fullClusters = [],
                    incompleteClusters = [],
                    usedClustersNames,
                    unusedClustersNames,
                    remainedTerritoriesIds = [],
                    remainedTerritoriesNames;

                // group used countries by cluster
                tgUtilities.forEach(usedCountries, function (country) {
                    var cluster = country.getCluster();

                    // create a new cluster entry in grouped countries collection
                    if (!groupedCountriesByCluster.hasOwnProperty(cluster.id)) {
                        groupedCountriesByCluster[cluster.id] = {
                            cluster: cluster,
                            countries: []
                        };
                    }

                    // push country into related cluster
                    groupedCountriesByCluster[cluster.id].countries.push(country);
                });

                // split clusters into full selected and incomplete
                tgUtilities.select(groupedCountriesByCluster, function (clusterMap) {
                    var allClusterCountries = clusterMap.cluster.getCountries();

                    if (allClusterCountries.length === clusterMap.countries.length) {
                        fullClusters.push(clusterMap.cluster);
                    } else {
                        incompleteClusters.push(clusterMap);
                    }
                });

                // collect used clusters names
                usedClustersNames = tgUtilities.select(fullClusters, function (usedCluster) {
                    return usedCluster.name;
                });

                // collect incomplete clusters names
                unusedClustersNames = tgUtilities.select(incompleteClusters, function (incompleteCluster) {
                    var allClusterCountries = incompleteCluster.cluster.getCountries(),
                        numberOfAllCountries = allClusterCountries.length;
                    numberOfUnusedCountries = numberOfAllCountries - incompleteCluster.countries.length;

                    // cluster exclusion rule:
                    //      - number of total countries in cluster should be more than 10
                    //      - number of unused countries should be less or equal than 10
                    //      - number of unused countries should be less than 25% of total countries in cluster
                    // if cluster exclusion rule is applicable, then display `<cluster name> excluding [<unused country>]`
                    if (numberOfAllCountries > 10 && numberOfUnusedCountries > 0 && numberOfUnusedCountries <= 10 && (numberOfUnusedCountries / numberOfAllCountries) <= 0.25) {
                        // get all unused countries names for current cluster
                        var unusedClusterCountriesNames = tgUtilities.select(allClusterCountries, function (country) {
                            var usedCountry = tgUtilities.each(incompleteCluster.countries, function (usedCountry) {
                                if (country.id === usedCountry.id) {
                                    return usedCountry;
                                }
                            });

                            if (!usedCountry) {
                                return country.name;
                            }
                        });

                        // sort excluded countries in alphabetical order
                        unusedClusterCountriesNames.sort();

                        return incompleteCluster.cluster.name + ' excluding ' + tgUtilities.naturalJoin(unusedClusterCountriesNames, ', ', ' and ');
                    } else {
                        tgUtilities.forEach(incompleteCluster.countries, function (country) {
                            remainedTerritoriesIds.push(country.id);
                        });
                    }
                });

                if (!tgUtilities.empty(remainedTerritoriesIds)) {
                    remainedTerritoriesIds = validateTerritories(remainedTerritoriesIds, data);

                    var remainedTerritories = getTerritories(remainedTerritoriesIds, data, true);

                    // collect remained territories names
                    remainedTerritoriesNames = tgUtilities.select(remainedTerritories, function (territory) {
                        return territory.name;
                    });
                }

                var territoriesNames = usedClustersNames.concat(unusedClustersNames);

                // sort territories in alphabetical order
                territoriesNames.sort();

                if (remainedTerritoriesNames) {
                    territoriesNames = territoriesNames.concat(remainedTerritoriesNames);
                }

                return territoriesNames.join(', ');
            }
        }

        return {
            prepareRawData: prepareRawData,
            validateTerritories: validateTerritories,
            getTerritories: getTerritories,
            getTerritoriesLabel: getTerritoriesLabel
        };
    }

    tgTerritoryService.$inject = ['$http', '$q'];

    function tgTerritoryService($http, $q) {
        var cachedTerritories;

        function get(cache) {
            var defer = $q.defer();

            if (cache && cachedTerritories) {
                defer.resolve(cachedTerritories);
            } else {
                var url = 'api/territories/territories.json';

                $http.get(url)
                    .success(function (response) {
                        cachedTerritories = response;
                        defer.resolve(cachedTerritories);
                    })
                    .error(function () {
                        defer.reject();
                    });
            }

            return defer.promise;
        }

        function clear() {
            cachedTerritories = undefined;
        }

        return {
            get: get,
            clear: clear
        };
    }

    function tgTerritoryServiceProvider() {
        return {
            $get: tgTerritoryService
        };
    }

    tgTerritory.$inject = ['$injector', '$parse', '$document'];

    function tgTerritory($injector, $parse, $document) {
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
                var tgTerritoryService = $injector.get('tgTerritoryService'),
                    tgTerritoryUtilities = $injector.get('tgTerritoryUtilities'),
                    tgUtilities = $injector.get('tgUtilities'),
                    $getModelValue = $parse(tAttrs.ngModel),
                    $setModelValue = $getModelValue.assign;

                function prepareOptions(obj, attrs, scope) {
                    var options = {};

                    if (attrs.tgTerritorySourceTypes) {
                        options.sourceTypes = $parse(attrs.tgTerritorySourceTypes)(scope);
                    } else {
                        options.sourceTypes = obj && obj.sourceTypes;
                    }

                    if (tgUtilities.empty(options.sourceTypes)) {
                        options.sourceTypes = ['COUNTRY'];
                    }

                    if (attrs.tgTerritoryPicker) {
                        options.picker = (attrs.tgTerritoryPicker !== 'false');
                    } else {
                        options.picker = !obj || obj.picker !== false;
                    }

                    if (attrs.tgTerritoryTagsTransform) {
                        options.tagsTransform = (attrs.tgTerritoryTagsTransform === 'true');
                    } else {
                        options.tagsTransform = obj && !!obj.tagsTransform || false;
                    }

                    options.maxLines = obj && obj.maxLines || 3;

                    options.tagManagerTemplateUrl = 'tg-territory-tag-manager.tpl.html';
                    options.tagTemplateUrl = 'tg-territory-tag.tpl.html';

                    return options;
                }

                function getTerritoriesString(source) {
                    var selectedCountriesIds = tgUtilities.select(source.countries, function (country) {
                        if (country.getState().selected) {
                            return country.id;
                        }
                    });

                    return tgTerritoryUtilities.getTerritoriesLabel(selectedCountriesIds, source);
                }

                function getClusterTerritories(cluster) {
                    var selectedCountries = [],
                        unselectedCountries = [];

                    tgUtilities.forEach(cluster.getCountries(), function (territory) {
                        var territoryState = territory.getState();

                        if (territoryState.selected) {
                            selectedCountries.push(territory);
                        } else {
                            unselectedCountries.push(territory);
                        }
                    });

                    return {
                        selectedCountries: selectedCountries,
                        unselectedCountries: unselectedCountries
                    };
                }

                function getRegionTerritories(region) {
                    var selectedCountries = [],
                        unselectedCountries = [];

                    tgUtilities.forEach(region.getCountries(), function (territory) {
                        var territoryState = territory.getState();

                        if (territoryState.selected) {
                            selectedCountries.push(territory);
                        } else {
                            unselectedCountries.push(territory);
                        }
                    });

                    return {
                        selectedCountries: selectedCountries,
                        unselectedCountries: unselectedCountries
                    };
                }

                function preLink(scope, element, attrs, controllers) {
                    var parentScope = scope.$parent,
                        options = prepareOptions(scope.tgTerritory, attrs, scope);

                    tgTerritoryService.get(true)
                        .then(function (response) {
                            initSource(response.data);
                        });

                    scope.$dataHolder = {
                        options: options,
                        source: undefined,
                        model: []
                    };

                    scope.$stateHolder = {
                        loading: true,
                        disabled: false,
                        popup: {
                            isOpen: false,
                            dirty: false
                        },
                        territoriesLabel: undefined
                    };

                    scope.$isDisabled = function () {
                        return scope.$stateHolder.loading || !!scope.tgTerritoryDisabled || scope.$stateHolder.disabled;
                    };

                    scope.$isVisibleType = function (type) {
                        return tgUtilities.has(options.sourceTypes, type);
                    };

                    scope.$isVisibleGlobeButton = function () {
                        return options.picker;
                    };

                    scope.$isAllExpanded = function () {
                        var source = scope.$dataHolder.source;

                        return !tgUtilities.each(source.clusters, function (cluster) {
                            if (!cluster.getState().expanded) {
                                return true;
                            }
                        });
                    };

                    scope.$isAllSelected = function () {
                        var source = scope.$dataHolder.source;

                        return !tgUtilities.each(source.countries, function (territory) {
                            if (!territory.getState().selected) {
                                return true;
                            }
                        });
                    };

                    scope.$isTerritoriesGroup = function (territory) {
                        return (territory.type === 'worldwide' ||
                                territory.type === 'cluster' ||
                                territory.type === 'region');
                    };

                    scope.$closePopup = function () {
                        if (scope.$stateHolder.popup.isOpen) {
                            scope.$stateHolder.popup.isOpen = false;
                            updateSelection();
                        }
                    };

                    scope.$openPopup = function () {
                        if (scope.$isVisibleType('CLUSTER')) {
                            scope.$stateHolder.popup.isOpen = !scope.$stateHolder.popup.isOpen;

                            if (scope.$stateHolder.popup.isOpen) {
                                updateTerritoriesLabel();
                            }
                        }
                    };

                    scope.$toggleAllClustersExpand = function (state) {
                        var clusters = scope.$dataHolder.source.clusters;

                        tgUtilities.forEach(clusters, function (cluster) {
                            var clusterState = cluster.getState();
                            clusterState.expanded = (state !== undefined) ? state : !clusterState.expanded;
                        });
                    };

                    scope.$toggleClusterExpand = function (cluster) {
                        var clusterState = cluster.getState();
                        clusterState.expanded = !clusterState.expanded;
                    };

                    scope.$expandClusterClass = function (cluster) {
                        var clusterState = cluster.getState();
                        return (clusterState.expanded) ? 'fa-caret-down' : 'fa-caret-right';
                    };

                    scope.$toggleWorldwide = function (state) {
                        tgUtilities.forEach(scope.$dataHolder.source.countries, function (territory) {
                            scope.$toggleCountrySelection(territory.getCluster(), territory, false, state);
                        });
                    };

                    scope.$toggleCountrySelection = function (cluster, territory, ignoreClusterUpdate, state) {
                        scope.$stateHolder.popup.dirty = true;

                        var clusterState = cluster.getState(),
                            territoryState = territory.getState(),
                            selected = (state === true || state === false) ? state : !territoryState.selected;

                        if (territoryState.selected !== selected) {
                            territoryState.selected = selected;

                            if (territoryState.selected) {
                                clusterState.selectedCountries++;
                            } else {
                                clusterState.selectedCountries--;
                            }

                            if (!ignoreClusterUpdate) {
                                updateCluster(cluster);
                                updateTerritoriesLabel();
                            }
                        }
                    };

                    scope.$toggleClusterSelection = function (cluster, state) {
                        var clusterTerritories = getClusterTerritories(cluster),
                            countries;

                        if (state === true || !tgUtilities.empty(clusterTerritories.unselectedCountries)) {
                            countries = clusterTerritories.unselectedCountries;
                        } else {
                            countries = clusterTerritories.selectedCountries;
                        }

                        tgUtilities.forEach(countries, function (country) {
                            scope.$toggleCountrySelection(cluster, country, true, state);
                        });

                        updateCluster(cluster);
                    };

                    scope.$toggleRegionSelection = function (cluster, region, state) {
                        var regionTerritories = getRegionTerritories(region);

                        if (state === true) {
                            tgUtilities.forEach(regionTerritories.unselectedCountries, function (regionTerritory) {
                                scope.$toggleCountrySelection(cluster, regionTerritory, true, state);
                            });
                        } else if (state === false) {
                            tgUtilities.forEach(regionTerritories.selectedCountries, function (regionTerritory) {
                                scope.$toggleCountrySelection(cluster, regionTerritory, true, state);
                            });
                        } else {
                            if (!tgUtilities.empty(regionTerritories.unselectedCountries)) {
                                tgUtilities.forEach(regionTerritories.unselectedCountries, function (regionTerritory) {
                                    scope.$toggleCountrySelection(cluster, regionTerritory, true, state);
                                });
                            } else {
                                tgUtilities.forEach(regionTerritories.selectedCountries, function (regionTerritory) {
                                    scope.$toggleCountrySelection(cluster, regionTerritory, true, state);
                                });
                            }
                        }

                        updateCluster(cluster);
                    };

                    scope.$clusterSelectionClass = function (cluster) {
                        var clusterState = cluster.getState();

                        if (clusterState.selectedCountries === cluster.getCountries().length) {
                            return 'fa-check-square-o';
                        } else if (clusterState.selectedCountries > 0) {
                            return 'fa-minus-square-o';
                        }

                        return 'fa-square-o';
                    };

                    scope.$onTagSelected = function (tag, sender) {
                        if (sender !== 'ModelUpdate') {
                            var item = tag.match.data;

                            switch (item.type) {
                                case 'worldwide':
                                    scope.$toggleWorldwide(true);
                                    break;
                                case 'cluster':
                                    scope.$toggleClusterSelection(item, true);
                                    break;
                                case 'region':
                                    scope.$toggleRegionSelection(item.getCluster(), item, true);
                                    break;
                                case 'country':
                                    scope.$toggleCountrySelection(item.getCluster(), item, false, true);
                                    break;
                            }

                            updateModel();
                        }
                    };

                    scope.$onTagDeselected = function (tag, sender) {
                        if (sender !== 'ModelUpdate') {
                            var item = tag.match.data;

                            switch (item.type) {
                                case 'worldwide':
                                    scope.$toggleWorldwide(false);
                                    break;
                                case 'cluster':
                                    scope.$toggleClusterSelection(item, false);
                                    break;
                                case 'region':
                                    scope.$toggleRegionSelection(item.getCluster(), item, false);
                                    break;
                                case 'country':
                                    scope.$toggleCountrySelection(item.getCluster(), item, false, false);
                                    break;
                            }

                            updateModel();
                        }
                    };

                    scope.$onOutsideClick = function () {
                        if (options.tagsTransform) {
                            getTypeaheadCtrl().switchToText();
                        }

                        if (scope.$stateHolder.popup.isOpen && scope.$stateHolder.popup.dirty) {
                            scope.$stateHolder.popup.dirty = false;
                            updateModel();
                        }

                        scope.$stateHolder.popup.isOpen = false;

                        scope.$digest();
                    };

                    scope.$onInsideClick = function () {
                        if (options.tagsTransform && !scope.$isDisabled()) {
                            getTypeaheadCtrl().switchToTags();
                            scope.$digest();
                        }
                    };

                    scope.initView = function () {
                        if (options.tagsTransform) {
                            getTypeaheadCtrl().switchToText();
                        }
                    };

                    function updateTerritoriesLabel() {
                        scope.$stateHolder.territoriesLabel = getTerritoriesString(scope.$dataHolder.source);
                    }

                    function updateCluster(cluster) {
                        var clusterState = cluster.getState();
                        clusterState.selected = tgUtilities.empty(getClusterTerritories(cluster).unselectedCountries);

                        updateClusterRegions(cluster);
                        updateTerritoriesLabel();
                    }

                    function updateClusterRegions(cluster) {
                        tgUtilities.forEach(cluster.getRegions(), function (region) {
                            var regionState = region.getState();
                            regionState.selected = tgUtilities.empty(getRegionTerritories(region).unselectedCountries);
                        });
                    }

                    function updateModel() {
                        scope.$dataHolder.model.length = 0;

                        var territories,
                            territoriesIds = tgUtilities.select(scope.$dataHolder.source.countries, function (country) {
                                if (country.getState().selected) {
                                    return country.id;
                                }
                            });

                        territoriesIds = tgTerritoryUtilities.validateTerritories(territoriesIds, scope.$dataHolder.source);
                        territories = tgTerritoryUtilities.getTerritories(territoriesIds, scope.$dataHolder.source, true);

                        Array.prototype.push.apply(scope.$dataHolder.model, territories);
                    }

                    function updateSelection() {
                        tgUtilities.forEach(scope.$dataHolder.source.all, function (item) {
                            item.getState().selected = false;

                            if (item.type === 'cluster') {
                                item.getState().selectedCountries = 0;
                            }
                        });

                        tgUtilities.forEach(scope.$dataHolder.model, function (item) {
                            item.getState().selected = false;
                        });
                    }

                    function getTypeaheadCtrl() {
                        var tgTypeaheadCtrl = element
                            .find('.tg-territory__input')
                            .controller('tgTypeahead');

                        return tgTypeaheadCtrl;
                    }

                    function applyToModel(model) {
                        scope.$dataHolder.model.length = 0;

                        tgUtilities.forEach(model, function (item) {
                            scope.$dataHolder.model.push(item);
                        });
                    }

                    function initSource(data) {
                        scope.$dataHolder.source = tgTerritoryUtilities.prepareRawData(data, options.sourceTypes);
                        scope.$stateHolder.loading = false;

                        applyToModel($getModelValue(parentScope));
                    }

                    parentScope.$watch($getModelValue, function (model) {
                        if (model !== scope.$dataHolder.model) {
                            if (scope.$dataHolder.source) {
                                applyToModel(model);
                                $setModelValue(parentScope, scope.$dataHolder.model);
                            }
                        }
                    });
                }

                function postLink(scope, element, attrs, controllers) {
                    var onDocumentClick = function (evt) {
                        if (element.has(evt.target).length === 0) {
                            scope.$onOutsideClick();
                        } else {
                            scope.$onInsideClick();
                        }
                    };

                    $document.on('click', onDocumentClick);

                    scope.$on('$destroy', function () {
                        $document.off('click', onDocumentClick);
                    });

                    scope.initView();
                }

                return {
                    pre: preLink,
                    post: postLink
                };
            },
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                var self = this,
                    $tgComponents = $injector.get('$tgComponents');

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
